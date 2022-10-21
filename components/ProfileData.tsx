import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import nookies from "nookies";

import Head from "next/head";
import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { NextPageContext, NextApiRequest } from "next";
import { ParsedQs } from "qs";
import Link from "next/link";
import { UserDetails } from "../types";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Props {
  users: UserDetails[];
}

export default function TableData({ users }: Props) {
  return (
    <TableContainer className="table__container" component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell>Middle Name</StyledTableCell>
            <StyledTableCell>Last Name</StyledTableCell>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: UserDetails) => (
            <Link href={`/profile/${user.id}`}>
              <StyledTableRow key={user.id}>
                <StyledTableCell className="capitalized">
                  {user.firstName}
                </StyledTableCell>
                <StyledTableCell className="capitalized">
                  {user.middleName}
                </StyledTableCell>
                <StyledTableCell className="capitalized">
                  {user.lastName}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {user.username}
                </StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.phone}</StyledTableCell>
              </StyledTableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
