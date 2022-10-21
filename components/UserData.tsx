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
  details: UserDetails[];
}

export default function TableData({ details }: Props) {
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
          {details.map((detail: UserDetails) => (
            <StyledTableRow key={detail.id}>
              <StyledTableCell className="capitalized">
                {detail.firstName}
              </StyledTableCell>
              <StyledTableCell className="capitalized">
                {detail.middleName}
              </StyledTableCell>
              <StyledTableCell className="capitalized">
                {detail.lastName}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {detail.username}
              </StyledTableCell>
              <StyledTableCell>{detail.email}</StyledTableCell>
              <StyledTableCell>{detail.phone}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
