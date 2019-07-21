import { isGitHubUserInContent } from "../../src/utils";

describe("isGitHubUserInContent", () => {
  it("should find the user in the content", async () => {
    const content = `# cla-sign-bot-test

### Signed

- @ert78gb
`;
    const founded = await isGitHubUserInContent({ login: "ert78gb" })(content);

    expect(founded).toBe(true);
  });

  it("should not find the user in the content", async () => {
    const content = `# cla-sign-bot-test

### Signed

- @ert78gb1
`;
    const founded = await isGitHubUserInContent({ login: "ert78gb" })(content);

    expect(founded).toBe(false);
  });
});
