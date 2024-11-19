import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
} from "@mui/material";
import toast from "react-hot-toast";
import { axiosSecure } from "../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch payment history from the server
  const fetchPaymentHistory = async () => {
    setLoading(true);
    try {
      const response = await axiosSecure.get("/payment-history");

      // Get the payments data and set them
      setPayments(response.data.payments);
    } catch (error) {
      console.error("Error fetching payment history:", error);
      toast.error("Error fetching payment history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentHistory(); // Fetch payment history on component mount
  }, []);

  return (
    <div>
      <h2>Payment History</h2>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Transaction Id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>{`${payment.month} ${payment.year}`}</TableCell>
                  <TableCell>{`$${payment.amount}`}</TableCell>
                  <TableCell>{payment.transactionId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default PaymentHistory;
