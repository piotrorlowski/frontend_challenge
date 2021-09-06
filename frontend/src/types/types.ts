import React from "react";
import { ActionMeta, OptionsType } from "react-select";

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

export type OnInputChange = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;

export type OnSelectChange = (
  value: OptionsType<{
    value: string;
    label: string;
  }>,
  actionMeta: ActionMeta<{
    value: string;
    label: string;
  }>
) => void;

export type SelectOption = {
  value: string;
  label: string;
};
