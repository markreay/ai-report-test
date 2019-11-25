import * as fs from "fs";
import * as path from "path";
import { reporterFactory } from "accessibility-insights-report";
import { scanNoIssues } from "./scan-no-issues";
import { scanIssues } from "./scan-issues";

const outputDirectory = "output";
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

const reporter = reporterFactory();

const files = [
  {
    scan: scanNoIssues,
    name: "scanNoIssues"
  },
  {
    scan: scanIssues,
    name: "scanIssues"
  }
];

files.forEach(({ scan, name }) => {
  const reportOptions = {
    browserSpec: "BROWSER_SPEC",
    browserVersion: "BROWSER_VERSION",
    pageTitle: "Accessibility Insights",
    description: "Automated report"
  };

  const html = reporter.fromAxeResult(scanNoIssues, reportOptions).asHTML();

  const outputName = path.join(outputDirectory, name + ".html");
  fs.writeFileSync(outputName, html);

  console.log(`Wrote ${outputName}`);
});
