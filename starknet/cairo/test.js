// const rs = require('./result.json');
//
// let r = rs.data.retweeters_timeline.timeline.instructions[0].entries;
// for (const rElement of r) {
//
// }
// console.log(r.length);



function testfollowing() {
    const rs = require('./following.json');

    let r = rs.data.user.result.timeline.timeline.instructions[3].entries;
    let count = 0;
    for (const rElement of r) {
        if (rElement.entryId) {
            count++;
        }
    }
    console.log(count);
}

testfollowing();