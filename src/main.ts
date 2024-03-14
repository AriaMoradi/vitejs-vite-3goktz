import runBuggy from './code-buggy';
import runOkay from './code-okay';

import './style.css'

const createBug = true;

if (createBug) {
  runBuggy();
} else {
  runOkay();
}

