import { Button, TableCell, TableRow } from "@mui/material";

export interface IProps {
  client: IClient;
}

export default function ClientListItem({ client }: IProps) {
  const { id, firstName, lastName, email, phoneNumber } = client;

  return (
    <TableRow
      key={id}
    >
      <TableCell component="th" scope="row">
        <Button sx={{textTransform: 'none'}} variant="text">{firstName} {lastName}</Button>
      </TableCell>
      <TableCell>{phoneNumber}</TableCell>
      <TableCell>{email}</TableCell>
    </TableRow>
  );
}
