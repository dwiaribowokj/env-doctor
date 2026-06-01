#!/usr/bin/env node
import { envDoctorCommand } from './analyze.js';
envDoctorCommand().name('env-doctor').parse();
