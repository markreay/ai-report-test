import { reporterFactory } from "accessibility-insights-report";
import * as fs from 'fs';
import { scanNoIssues } from "./scan-no-issues";
import { scanIssues } from "./scan-issues";

const reportOptions = {
    browserSpec: 'BROWSER_SPEC',
    browserVersion: 'BROWSER_VERSION',
    pageTitle: 'Accessibility Insights',
    description: 'Automated report',
};

const reporter = reporterFactory();
const htmlNoIssues = reporter.fromAxeResult(scanNoIssues, reportOptions).asHTML();
fs.writeFileSync("scanNoIssues.html", htmlNoIssues);
const htmlIssues = reporter.fromAxeResult(scanIssues, reportOptions).asHTML();
fs.writeFileSync("scanIssues.html", htmlIssues);
