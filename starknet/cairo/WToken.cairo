// SPDX-License-Identifier: GPL-3.0
%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.uint256 import Uint256
from openzeppelin.token.erc20.library import ERC20

from openzeppelin.access.accesscontrol.library import AccessControl
from openzeppelin.utils.constants.library import DEFAULT_ADMIN_ROLE

from starkware.starknet.common.syscalls import get_caller_address


const MINTER_ROLE = 0x4f96f87f6963bb246f2c30526628466840c642dc5c50d5a67777c6cc0e44ab5;
const BURNER_ROLE = 0x7823a2d975ffa03bed39c38809ec681dc0ae931ebe0048c321d4a8440aed509;

@constructor
func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr} (name: felt, symbol: felt) {
    
    ERC20.initializer(name, symbol, 18);

    AccessControl.initializer();

    let (caller) = get_caller_address();
    AccessControl._grant_role(DEFAULT_ADMIN_ROLE, caller);

    return ();
}

//
// Getters
//

@view
func name{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (name: felt) {
    return ERC20.name();
}

@view
func symbol{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (symbol: felt) {
    return ERC20.symbol();
}

@view
func totalSupply{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    totalSupply: Uint256
) {
    let (totalSupply: Uint256) = ERC20.total_supply();
    return (totalSupply=totalSupply);
}

@view
func decimals{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    decimals: felt
) {
    return ERC20.decimals();
}

@view
func balanceOf{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(account: felt) -> (
    balance: Uint256
) {
    return ERC20.balance_of(account);
}

@view
func allowance{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    owner: felt, spender: felt
) -> (remaining: Uint256) {
    return ERC20.allowance(owner, spender);
}

//
// Externals
//

@external
func transfer{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    recipient: felt, amount: Uint256
) -> (success: felt) {
    return ERC20.transfer(recipient, amount);
}

@external
func transferFrom{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    sender: felt, recipient: felt, amount: Uint256
) -> (success: felt) {
    return ERC20.transfer_from(sender, recipient, amount);
}

@external
func approve{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    spender: felt, amount: Uint256
) -> (success: felt) {
    return ERC20.approve(spender, amount);
}

@external
func increaseAllowance{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    spender: felt, added_value: Uint256
) -> (success: felt) {
    return ERC20.increase_allowance(spender, added_value);
}

@external
func decreaseAllowance{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    spender: felt, subtracted_value: Uint256
) -> (success: felt) {
    return ERC20.decrease_allowance(spender, subtracted_value);
}


// mint and burn

@external
func mint{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr} (recipient: felt, amount: Uint256) {

    AccessControl.assert_only_role(MINTER_ROLE);

    ERC20._mint(recipient, amount);

    return ();
}

@external
func burn{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr} (account: felt, amount: Uint256) {

    AccessControl.assert_only_role(BURNER_ROLE);

    ERC20._burn(account, amount);
    
    return ();
}


// roles control

@view
func has_role{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    role: felt, user: felt
) -> (has_role: felt) {
    return AccessControl.has_role(role, user);
}

@view
func get_role_admin{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    role: felt
) -> (admin: felt) {
    return AccessControl.get_role_admin(role);
}

@external
func grant_role{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr} (role: felt, user: felt) {
    AccessControl.grant_role(role, user);
    return ();
}

@external
func revoke_role{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr} (role: felt, user: felt) {
    AccessControl.revoke_role(role, user);
    return ();
}

@external
func renounce_role{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr} (role: felt, user: felt) {
    AccessControl.renounce_role(role, user);
    return ();
}




