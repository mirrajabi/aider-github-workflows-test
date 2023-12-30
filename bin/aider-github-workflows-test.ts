#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AiderGithubWorkflowsTestStack } from '../lib/aider-github-workflows-test-stack';

const app = new cdk.App();
new AiderGithubWorkflowsTestStack(app, 'AiderGithubWorkflowsTestStack');
