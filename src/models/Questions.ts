import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Options } from "./Options";

@Table({
  timestamps: true,
  tableName: "questions",
})
export class Questions extends Model<Questions> {
  @PrimaryKey
  @ForeignKey(() => Options)
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @Column({ type: DataType.STRING, allowNull: false })
  value: string;

  @HasMany(() => Options)
  options: Options[];
}
