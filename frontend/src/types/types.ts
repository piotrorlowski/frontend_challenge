import React from "react";

export type Data = {
  clicks: number;
  impressions: number;
  date: string;
  datasource: string;
  campaign: string;
};

export type DataSource = {
  value: string;
};

export type Campaign = {
  name: string;
  label: string;
  index: number;
};

export type CampaignOptions = {
  value: string;
  label: string;
};

export type Callback = <T1>(param: T1) => void;

export type InputEventHandlerFunction = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;

export type SelectEventHandlerFunction = (
  event: React.ChangeEvent<HTMLSelectElement>
) => void;
