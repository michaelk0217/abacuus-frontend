import { auth, signOut } from "@/auth";
import { useSession, SessionContextValue } from "next-auth/react";
import { Session } from "next-auth";

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

// SERVER SIDE FUNCTIONS
//-------------------------------------------------------
export const SSapiRefreshTokenCall = async () => {
  console.log("Refreshing token");
  const session = await auth();
  const refreshToken = session?.refreshToken;
  if (!refreshToken) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ABACUUS_API_URL}/token/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    ).then((res) => res.json());

    if (response.ok) {
      console.log("Token successfully refreshed.");
      session.accessToken = response.access;
    } else {
      //logout
      console.log("Refreshtoken failed.");
      console.error(response);
      //   signOut();
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};

export const SSbackendAuthenticatedRequest = async (
  url: string,
  options: RequestOptions
) => {
  const session = await auth();
  let accessToken = session?.accessToken;
  //   const oldAccessToken = accessToken;
  if (!accessToken) {
    signOut();
  }
  let response = await fetch(url, options);
  if (response.status === 401) {
    await SSapiRefreshTokenCall();
    accessToken = session?.accessToken;
    // if (accessToken === oldAccessToken) {
    //   console.log("Access token did not change");
    // }
    options.headers = options.headers || {}; // Ensure headers is defined
    options.headers["Authorization"] = `Bearer ${accessToken}`;
    response = await fetch(url, options);
  }
  if (!response.ok) {
    console.error("API request failed, logging out:", response.statusText);
    signOut();
  }

  return response;
};

export const SSapiGetCall = async (url: string) => {
  const session = await auth();
  const accessToken = session?.accessToken;
  // const data = await backendAuthenticatedRequest(url);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  const options: RequestOptions = {
    method: "GET",
    headers: headers,
  };

  try {
    const response = await SSbackendAuthenticatedRequest(url, options);

    if (!response.ok) {
      console.error(`Failed to fetch ${url}: `, response.status);
      throw new Error(`Failed to fetch ${url}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(`Failed to fetch ${url}`, error);
    throw error;
  }
};
//-------------------------------------------------------

// CLIENT SIDE FUNCTIONS
//-------------------------------------------------------

export const CSapiRefreshTokenCall = async (session: Session) => {
  //   const { data: session, status } = useSessionHook();

  const refreshToken = session?.refreshToken;
  if (!refreshToken) {
    return;
  }
  console.log("Refresh token:", refreshToken);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ABACUUS_API_URL}/token/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Token successfully refreshed.");
      session.accessToken = data.access;
    } else {
      //logout
      console.log("Refreshtoken failed.");
      console.error();
      //   signOut();
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};

export const CSbackendAuthenticatedRequest = async (
  session: Session,
  url: string,
  options: RequestOptions
) => {
  //   const { data: session, status } = useSessionHook();
  let accessToken = session?.accessToken;
  //   const oldAccessToken = accessToken;
  if (!accessToken) {
    signOut();
  }
  let response = await fetch(url, options);
  if (response.status === 401) {
    await CSapiRefreshTokenCall(session);
    accessToken = session?.accessToken;
    // if (accessToken === oldAccessToken) {
    //   console.log("Access token did not change");
    // }
    options.headers = options.headers || {}; // Ensure headers is defined
    options.headers["Authorization"] = `Bearer ${accessToken}`;
    response = await fetch(url, options);
  }
  if (!response.ok) {
    console.error("API request failed, logging out:", response.statusText);
    // signOut();
  }

  return response;
};

export const CSapiGetCall = async (session: Session, url: string) => {
  //   const { data: session, status } = useSessionHook();
  const accessToken = session?.accessToken;
  //   console.log("accessToken", accessToken);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  const options: RequestOptions = {
    method: "GET",
    headers: headers,
  };

  try {
    const response = await CSbackendAuthenticatedRequest(session, url, options);

    if (!response.ok) {
      console.error(`Failed to fetch ${url}: `, response.status);
      throw new Error(`Failed to fetch ${url}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(`Failed to fetch ${url}`, error);
    throw error;
  }
};
