import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export const TableSkeleton = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
};
