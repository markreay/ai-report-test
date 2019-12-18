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
    results: scan,
    description: "Automated report",
    serviceName: "Mark's Accessibility Service",
    scanContext: {
      browserSpec: "MarkBrowser Version 0.0.0.0.0.0.1",
      pageTitle: "Accessibility Insights",
    }
  };

  const html = reporter.fromAxeResult(reportOptions).asHTML();

  const outputName = path.join(outputDirectory, name + ".html");
  fs.writeFileSync(outputName, html);

  console.log(`Wrote ${outputName}`);
});
