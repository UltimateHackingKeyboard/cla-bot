export const isGitHubUserInContent = (user: { login: string }) => {
  return (content: string): Promise<boolean> => {
    const founded = content
      .split("\n")
      .some(line => new RegExp("^- @" + user.login + "$").test(line));

    return Promise.resolve(founded);
  };
};
