"use client";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { FavSymbolData } from "@/lib/backend-api/interfaces";
import { useSession } from "next-auth/react";
import { CSapiGetCall } from "@/lib/backend-api/api";
import FavSymbolCell from "@/components/favorites-page/FavSymbolCell";
import FavSymbolBreadCrumb from "@/components/favorites-page/FavSymbolBreadCrumb";
import FavSymbolHeader from "@/components/favorites-page/FavSymbolHeader";
export default function FavSymbolList() {
  const url = `${process.env.NEXT_PUBLIC_ABACUUS_API_URL}/get_favorite_symbol_list/`;
  const [data, setData] = useState<FavSymbolData[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession({ required: true });
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!session) {
        return;
      }
      try {
        const data = await CSapiGetCall(session, url);
        const favSymbolData = data.favorite_symbol_list;
        if (isMounted) {
          setData(favSymbolData);
          setLoading(false);
          //   console.log("favSymbolData", favSymbolData);
        }
      } catch (error) {
        console.error("Error fetching favorite symbol list:", error);
        setLoading(false);
      }
      //   console.log("session", session);
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 5000); // 5000 ms = 5 seconds

    return () => {
      clearInterval(intervalId);
      isMounted = false;
    };
  }, [url, session]);

  return (
    <Box sx={{ maxWidth: "700px" }}>
      <FavSymbolHeader />
      <Stack spacing={2}>
        {data.map((favSymbolData) => (
          <FavSymbolCell
            key={favSymbolData.ticker_symbol}
            favSymbolData={favSymbolData}
          />
        ))}
      </Stack>
    </Box>
  );
}
