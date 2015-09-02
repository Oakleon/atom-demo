"use strict";

import _Fetch from 'isomorphic-fetch';
import _Lodash from 'lodash';

async function fetch() {
    let result = await _Fetch('http://localhost:8000/data.json');
    return await result.json();
}

function report({cpu, memory, load, disk = "No Disk"}) {

    let cpu_values  = _Lodash.values(cpu);
    let cpu_average = cpu_values.reduce((a,b) => { return a+b; }) / cpu_values.length;

    console.log(`cpu: ${cpu_average}%`);
    console.log(`memory: ${memory.used}B used, ${memory.free}B free`);
    console.log(`load averages: ${load['1m']},${load['5m']},${load['15m']}`);
    console.log(`disk: ${disk}`);
}

async function main() {
    let data = await fetch()
    .catch((err) => {
        console.error(err);
    });

    report(data);
}

main();
