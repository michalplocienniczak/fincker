export type ActionResponseType =
  | {
      status: "success"
    }
  | {
      status: "error"
      error: string | unknown
    }
