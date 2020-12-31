import { Endpoints } from "@octokit/types";

export * from './file-info'

export type Pr = Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}']["response"]['data']
export type PrFiles = Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/files']["response"]['data']
export type RepoLabels = Endpoints['GET /repos/{owner}/{repo}/labels']["response"]['data']
export type RepoCreateLabel = Endpoints['POST /repos/{owner}/{repo}/labels']["parameters"]
export type RepoContentResponse = Endpoints['GET /repos/{owner}/{repo}/contents/{path}']["response"]["data"]
export type BlobResponse = Endpoints['GET /repos/{owner}/{repo}/git/blobs/{file_sha}']["response"]["data"]

