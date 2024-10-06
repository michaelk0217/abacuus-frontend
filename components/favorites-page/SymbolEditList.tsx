import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useCallback } from "react";
import { CSapiGetCall } from "@/lib/backend-api/api";

interface SymbolInfoListCheckboxProps {
  open: boolean;
}

interface SymbolInfoList {
  ticker_symbol: string;
  exchange: string;
  current_price: number;
  price_change_percentage: number;
  is_favorite: boolean;
}

export default function SymbolEditList({ open }: SymbolInfoListCheckboxProps) {
  const [symbolInfoList, setSymbolInfoList] = React.useState<SymbolInfoList[]>(
    []
  );
  const get_symbol_info_list_url = `${process.env.NEXT_PUBLIC_ABACUUS_API_URL}/get_symbol_info_list/`;
  const { data: session } = useSession({ required: true });

  if (!session) {
    return <div>Loading...</div>;
  }

  const router = useRouter();
  useEffect(() => {
    // console.log("open", open);

    let isMounted = true;
    const fetchSymbolInfoList = async () => {
      try {
        const data = await CSapiGetCall(session, get_symbol_info_list_url);
        if (isMounted) {
          setSymbolInfoList(data.symbol_info_list);
        }
      } catch (error) {
        if (isMounted) {
          console.log("error", error);
        }
      }
    };

    if (open) {
      fetchSymbolInfoList();
    }

    return () => {
      isMounted = false;
    };
  }, [open, router]);

  useEffect(() => {
    // console.log("symbolInfoList updated:", symbolInfoList);
  }, [symbolInfoList]);

  if (!Array.isArray(symbolInfoList)) {
    console.error("symbolInfoList is not an array:", symbolInfoList);
    return <div>Loading...</div>;
  }

  const handleToggle = async (ticker: string, currentFavorite: boolean) => {
    try {
      const newFavoriteStatus = !currentFavorite;
      const set_favorite_symbol_url = `${process.env.NEXT_PUBLIC_ABACUUS_API_URL}/set_favorite_symbol/?ticker_symbol=${ticker}&is_favorite=${newFavoriteStatus}`;
      await CSapiGetCall(session, set_favorite_symbol_url);

      setSymbolInfoList((prevList) =>
        prevList.map((item) =>
          item.ticker_symbol === ticker
            ? { ...item, is_favorite: newFavoriteStatus }
            : item
        )
      );
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  return (
    <List
      dense
      sx={{
        width: "100%",
        maxWidth: 360,
        maxHeight: 300,
        overflow: "auto",
        "& ul": { padding: 0 },
      }}
    >
      {symbolInfoList.map((symbol) => {
        const labelId = `checkbox-list-secondary-label-${symbol.ticker_symbol}`;
        return (
          <ListItem
            key={symbol.ticker_symbol}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={() =>
                  handleToggle(symbol.ticker_symbol, symbol.is_favorite)
                }
                checked={symbol.is_favorite}
                inputProps={{ "aria-labelledby": labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemText id={labelId} primary={symbol.ticker_symbol} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
