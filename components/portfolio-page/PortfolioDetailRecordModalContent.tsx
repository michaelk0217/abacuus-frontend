import { CSapiGetCall } from "@/lib/backend-api/api";
import type { DailyRecordList } from "@/lib/backend-api/interfaces";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "10%",
  left: "10%",
  //   transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  borderWidth: 1,
  borderColor: "divider",
  borderStyle: "solid",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function PortfolioDetailRecordModalContent({
  portfolioId,
  date,
}: {
  portfolioId: number;
  date: string;
}) {
  const [recordList, setRecordList] = useState<DailyRecordList>();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession({ required: true });

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (portfolioId == 0 || date == "") return;
      if (!session) return;
      const url = `${process.env.NEXT_PUBLIC_ABACUUS_API_URL}/get_daily_record_list/?portfolio_config_id=${portfolioId}&date=${date}`;

      const response = await CSapiGetCall(session, url);

      if (isMounted) {
        setRecordList(response.daily_record_list);
        setLoading(false);
      }
    };
    fetchData();
  }, [portfolioId, date, session]);

  if (loading)
    return (
      <Box sx={style}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );

  return (
    <Box sx={style}>
      <Typography variant="h6">Date: {recordList?.date}</Typography>
      <Typography variant="h6">
        Balance: ${recordList?.balance.toFixed(2)}
      </Typography>
    </Box>
  );
}
