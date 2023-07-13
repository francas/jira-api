const axios = require("axios");
require("dotenv").config();

async function getComponentIssues() {
    const baseUrl = process.env.API_URL;
    const auth =
        "Basic " +
        Buffer.from(
            `${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`
        ).toString("base64");

    try {
        const [componentsResponse, issuesResponse] = await axios.all([
            axios.get(`${baseUrl}/project/SP/components`, {
                headers: { Authorization: auth },
            }),
            axios.get(`${baseUrl}/search?jql=project=SP`, {
                headers: { Authorization: auth },
            }),
        ]);

        const components = componentsResponse.data;
        const issues = issuesResponse.data.issues;

        // Filter components without a component lead
        const componentsWithoutLead = components.filter(
            (component) => !component.lead
        );

        // Create a map to store component issues count
        const componentIssuesCount = new Map();

        // Count the number of issues per component
        for (const issue of issues) {
            const issueComponents = issue.fields.components;
            if (issueComponents) {
                for (const component of issueComponents) {
                    const componentId = component.id;
                    if (componentIssuesCount.has(componentId)) {
                        componentIssuesCount.set(
                            componentId,
                            componentIssuesCount.get(componentId) + 1
                        );
                    } else {
                        componentIssuesCount.set(componentId, 1);
                    }
                }
            }
        }

        // Print the components without a component lead and their issue count
        console.log("Components without a component lead:");
        for (const component of componentsWithoutLead) {
            const issueCount = componentIssuesCount.get(component.id) || 0;
            console.log(
                `Component: ${component.name} (${issueCount} issue(s))`
            );
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Call the function to retrieve and display the component issues
getComponentIssues();
