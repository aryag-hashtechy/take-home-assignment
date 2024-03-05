import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Questions } from "./Questions";

@Table({
  timestamps: true,
  tableName: "options",
})
export class Options extends Model<Options> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  })
  id: number;

  @ForeignKey(() => Questions)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  questionId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  label: string;

  @Column({ type: DataType.STRING, allowNull: false })
  value: string;
}
