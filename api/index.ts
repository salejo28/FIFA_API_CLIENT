import axios, { Axios, AxiosResponse } from "axios";

interface DataPost {
  page: number;
  name: string;
}

class Player {
  api: Axios;

  constructor() {
    this.api = axios.create({
      baseURL: (process.env.NEXT_PUBLIC_API as string) + "/api/v1",
    });
  }

  async apiCall(request: () => Promise<AxiosResponse>) {
    try {
      return (await request()).data;
    } catch (error: any) {
      console.error(error);
      return error.response.data;
    }
  }

  async getPlayers(search?: string, page?: number, order?: string) {
    return await this.apiCall(() =>
      this.api.get(
        `/players${search ? `?search=${search as string}` : ""}${
          page && search
            ? `&page=${page as number}`
            : `${page ? `?page=${page}` : ""}`
        }${order ? `&order=${order}` : ""}`,
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_TOKEN_AUTHORIZATION as string,
          },
        }
      )
    );
  }

  async searchByClub(data: DataPost) {
    return await this.apiCall(() =>
      this.api.post("/team", data, {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_TOKEN_AUTHORIZATION as string,
        },
      })
    );
  }
}

export default new Player();
