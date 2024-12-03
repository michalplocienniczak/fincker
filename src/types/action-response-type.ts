export type ActionResponseType<TData = undefined> =
  | {
      status: "success"
      data?: TData
    }
  | {
      status: "error"
      error: string
    }
