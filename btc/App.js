import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import bitcoinMessage from 'bitcoinjs-message';
import './App.css';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  form: {
    '& > *': {
      margin: theme.spacing(1)
    },
  }
});

class App extends Component {
  state = {
    address: '',
    message: '',
    signature: '',
    result: ''
  }

  simpleVerification = (message, address, signature) => {
    let isValid = false;
    try {
      isValid = bitcoinMessage.verify(message, address, signature);
    }catch(e) {
    }
    return isValid;
  }

  fallbackVerification = (message, address, signature) => {
    let isValid = false;
    const flags = [...Array(12).keys()].map(i => i + 31);
    for (let flag of flags) {
      let flagByte = Buffer.alloc(1);
      flagByte.writeInt8(flag);
      let sigBuffer = Buffer.from(signature, 'base64').slice(1);
      sigBuffer = Buffer.concat([flagByte, sigBuffer]);
      let candidateSig = sigBuffer.toString('base64');
      try {
        isValid = bitcoinMessage.verify(message, address, candidateSig);
        if (isValid) break;
      }catch(e) {
      }
    }
    return isValid;
  }

  onVerifyClicked = e => {
    e.preventDefault();
    const {
      message,
      address,
      signature
    } = this.state;

    let isValid = false;
    isValid = this.simpleVerification(message, address, signature);
    if (!isValid) {
      isValid = this.fallbackVerification(message, address, signature);
    }

    this.setState({
      result: isValid ? 'Valid signature' : 'Invalid signature'
    });
  };

  onChange = e => {
    switch(e.target.id) {
      case 'address':
        this.setState({address: e.target.value, result: ''});
        break;
      case 'signature':
        this.setState({signature: e.target.value, result: ''});
        break;
      case 'message':
        this.setState({message: e.target.value, result: ''});
        break;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Box className="App">
        <Container maxWidth="sm">
          <Typography variant="h3">Verify a signed bitcoin message</Typography>
          <Typography variant="body1">Compatible with segwit bech32 addresses (beginning with bc1)! This site is the only one on the internet that can do this right now; all the others only handle legacy addresses.</Typography>
        </Container>
        <Container maxWidth="sm">
          <form className={classes.form}>
            <TextField
              id="address"
              type="text"
              variant="outlined"
              fullWidth
              label="Bitcoin Address"
              value={this.state.address}
              onChange={this.onChange}/>
            <br></br>
            <TextField
              id="message"
              type="text"
              variant="outlined"
              multiline
              fullWidth
              rows="6"
              label="Message"
              value={this.state.message}
              onChange={this.onChange}/>
            <br></br>
            <TextField
              id="signature"
              type="text"
              variant="outlined"
              fullWidth
              label="Signature"
              value={this.state.signature}
              onChange={this.onChange}/>
            <br></br>
          </form>
          <Button
            color="primary"
            size="large"
            variant="contained"
            onClick={this.onVerifyClicked}>
            Verify
          </Button>
          <p id="result">{this.state.result}</p>
          <Typography variant="caption">
            ** Works only when the bech32 address arises from a single public/private key pair with no other conditions (P2WPKH). If it's multisig or timelocked for example, it won't work.
          </Typography>
          <br></br>
          <Typography variant="caption">
            This website is hosted and maintained by an individual as a charitable endeavour. Please donate to support it! For questions or suggestions, email verifybitcoinmessage@gmail.com.
          </Typography>
          <br></br>
          <Typography variant="body1" variant="outlined">
            bitcoin address: bc1qkxtzzd3xdv9amc9xhcrpg84z7794m5ju79npf8
          </Typography>
          <Typography>
            legacy: 19fkQrHcM6TNUCfCKTyp9stDpc4F78EStP
          </Typography>
        </Container>
      </Box>
    );
  }
}

export default withStyles(styles)(App);
