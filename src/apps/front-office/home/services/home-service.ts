import endpoint from "shared/endpoint";

// for dummy purpose only
export function getHome() {
  return endpoint.get("/home");
}
