#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rinbowTitle = chalkAnimation.rainbow(
        'Who wants to be  millionare? \n'
    );


    await sleep();
    rinbowTitle.stop();

    console.log(
        `${chalk.bgBlue('How to Play')}
    I am a process on your computer
    if yoy get any question wrong i will be ${chalk.bgRed('Killed')}
    so get all the questions right...
    
    `);
}


async function askname() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        }
    });

    playerName = answers.player_name;
}
await welcome();
await askname();

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'List',
        message: 'Javascript was created in 10 days and released in on \n',
        choices: [
            'May 23rd, 1995',
            'Nov 24th, 1995',
            'Dec 4th, 1995',
            'Dec 17, 1996',
        ],
    });

    return handleAnswer(answers.question_1 == 'Dec 4th, 1995');
}


async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking Answer...');
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}. That's a legit answer.` });
    } else {
        spinner.error({ text: `Game over, you lose ${playerName}` });
        process.exit(1);
    }
}
await question1();