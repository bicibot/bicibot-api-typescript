import { Document, Schema, Model, model } from "mongoose";
import { ReportInterface } from "../interfaces/Report";

export interface ReportModel extends ReportInterface, Document {}

const ReportSchema = new Schema(
  {
    description: {
      type: String,
      trim: true,
      required: false
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    report_type: {
      type: String,
      required: true,
      enum: ["Ameaça", "Manutenção", "Invasão", "Ciclofaixa apagada"],
      trim: true
    },
    plate: {
      type: String,
      trim: true,
      validate: {
        validator: function(p: String) {
          return /^[a-zA-Z]{3}[0-9]{4}\b/.test(p.replace("-", ""));
        },
        message: props => `${props.value} não é uma placa valida!`
      }
    },
    maintenace_type: {
      type: String,
      enum: ["Pintura", "Buraco", "Proteção", "Cruzamento", "Semáforo"],
      trim: true
    },
    invasion_state: {
      type: String,
      enum: ["Trafegando", "Parado", "Estacionado"],
      trim: true
    },
    invasion_vehicle: {
      type: String,
      enum: ["Carro", "Moto", "Táxi", "Ônibus", "Caminhão"],
      trim: true
    },

    invasion_time: {
      type: String,
      enum: ["4h às 10h", "10h às 16h", "16h às 22h", "22h às 4h"],
      trim: true
    },
    bus_company: {
      type: String,
      trim: true
    },
    bus_number: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

export const Report: Model<ReportModel> = model<ReportModel>(
  "Report",
  ReportSchema
);
