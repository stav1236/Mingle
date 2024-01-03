import { useState } from "react";
import {
  Typography,
  Card,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Divider,
} from "@mui/material";
import { CURRENCY, Currency } from "@/models/Currency";
import { useQuery } from "react-query";
import mingleAxios from "@/utilities/axios";
import { getHebrewDate } from "@/utilities/dateUtils";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Crypto = () => {
  const [currency, setCurrency] = useState<Currency>(CURRENCY.שקל);
  const [amount, setAmount] = useState<number>(10);

  const { data: coins = [] } = useQuery<any[]>(
    ["crypto", amount, currency],
    () =>
      mingleAxios(`/crypto/${amount}/${currency}`).then((res) => {
        console.log(res.data);
        return res.data as any[];
      })
  );

  const { data: mingleCoin } = useQuery<any>(["crypto", "mingle"], () =>
    mingleAxios(`/crypto/mingle`).then((res) => {
      console.log(res.data);
      return res.data as any[];
    })
  );

  return (
    <>
      <Card
        sx={{
          p: 3,
          maxWidth: "90vw",
          width: 600,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom fontWeight="bold" variant="h5">
            קריפטו
          </Typography>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            <FormControl style={{ width: "48%" }}>
              <InputLabel htmlFor="number-select">כמות</InputLabel>
              <Select
                MenuProps={MenuProps}
                label="כמות"
                value={amount}
                onChange={(e) => setAmount(e.target.value as number)}
                inputProps={{
                  name: "number",
                  id: "number-select",
                }}
              >
                {[...Array(30)].map((_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={{ width: "48%" }}>
              <InputLabel htmlFor="currency-select">מטבע</InputLabel>
              <Select
                label="מטבע"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                inputProps={{
                  name: "currency",
                  id: "currency-select",
                }}
              >
                {Object.keys(CURRENCY).map((curr) => (
                  <MenuItem key={curr} value={{ ...CURRENCY }[curr]}>
                    {curr}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TableContainer sx={{ mt: 4, maxHeight: 400 }} component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>דירוג</TableCell>
                  <TableCell align="right">שם</TableCell>
                  <TableCell align="right">מחיר</TableCell>
                  <TableCell align="right">עדכון אחרון</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coins.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{row.rank}</TableCell>
                    <TableCell align="right">{`${row.name} (${row.symbol})`}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.lastUpdated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ m: 2 }} orientation="horizontal" flexItem>
            המטבע שלנו
          </Divider>

          <Box
            display={"flex"}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            border={1}
            borderColor="primary.main"
            borderRadius={3}
            p={2}
            width={300}
          >
            <Typography variant="h6">
              {mingleCoin?.name} ({mingleCoin?.symbol})
            </Typography>
            <Typography variant="body1">{`מחיר ${mingleCoin?.price} ש"ח`}</Typography>
            <Typography variant="body2">
              עדכון אחרון: {mingleCoin?.date}
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default Crypto;
