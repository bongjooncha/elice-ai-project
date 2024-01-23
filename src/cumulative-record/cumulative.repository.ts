import { DataSource, Repository } from "typeorm";
import { CumulativeRecord } from "./cumulative-record.entity";
import { InjectRepository } from "@nestjs/typeorm";
// import { User } from "src/user/user.entity";
import { Injectable } from "@nestjs/common";
import {
  CumulativeDateMealTypeDto,
  CumulativeRecordDateDto,
  CumulativeRecordMonthDto,
} from "./dtos/cumulative-record.dto";

@Injectable()
export class CumulativeRecordRepository extends Repository<CumulativeRecord> {
  constructor(
    @InjectRepository(CumulativeRecord)
    private cumulativeRecordRepository: Repository<CumulativeRecord>
  ) {
    super(
      cumulativeRecordRepository.target,
      cumulativeRecordRepository.manager,
      cumulativeRecordRepository.queryRunner
    );
  }

  // 일별 데이터 - totalCalories, totalNutrient
  async getDateRecord(
    date: Date,
    userId: string
  ): Promise<CumulativeRecordDateDto[]> {
    const cumulativeResult = await this.createQueryBuilder("entity")
      .select("entity.userId", "userId")
      .addSelect("entity.date", "data")
      .addSelect("SUM(entity.mealTotalCalories)", "totalCalories")
      .addSelect("SUM(entity.carbohydrates)", "carbohydrates")
      .addSelect("SUM(entity.proteins)", "proteins")
      .addSelect("SUM(entity.fats)", "fats")
      .addSelect("SUM(entity.dietaryFiber)", "dietaryFiber")
      .where("DATE_TRUNC('day', entity.date) = :date", { date })
      .andWhere("entity.user_id = :userId", { userId })
      .groupBy("entity.user_id, entity.date") // 순서에 따른 조회 속도 확인하기
      .getRawMany();
    return cumulativeResult;
  }

  // 일별/타입별 데이터 - mealType, calories, (imgURL)
  async getDateMealTypeRecord(date: Date, userId: string) {
    const result = await this.createQueryBuilder("entity")
      .select([
        "entity.mealType",
        "entity.mealTotalCalories",
        "entity.recordIds",
      ])
      .where("DATE_TRUNC('day', entity.date) = :date", { date })
      .andWhere("entity.user_id = :userId", { userId })
      .getMany();
    return result;
    // 날짜를 먼저 조회하는 것 vs 유저 id를 먼저 조회하는 것 -> 무엇이 더 빠를까?
  }

  // 월별 데이터 - date, totalCalories
  async getMonthRecord(
    month: Date,
    userId: string
  ): Promise<CumulativeRecordMonthDto[]> {
    const result = await this.createQueryBuilder("entity")
      .select("entity.userId", "userId")
      .addSelect("DATE_TRUNC('day', entity.date)", "date")
      .addSelect("SUM(entity.mealTotalCalories)", "totalCalories")
      // .select([
      //   "entity.userId",
      //   "DATE_TRUNC('day', entity.date)",
      //   "SUM(entity.mealTotalCalories)",
      // ])
      .where("entity.user_id = :userId", { userId })
      .andWhere("DATE_TRUNC('month', entity.date) = :month", {
        month: `${month}-01`,
      })
      .groupBy("entity.user_id, DATE_TRUNC('day', entity.date)")
      .getRawMany();
    // .getMany();
    return result;
  }

  // 월별 데이터 - date, mealType, calories, (imgURL)
  async getMonthDetailRecord(page: Number, userId: string) {
    // 날짜 범위 지정
    const result = await this.createQueryBuilder("entity")
      .where("entity.user_id = :userId", { userId })
      .andWhere("DATE_TRUNC('day', entity.date) = :date", { page }) // 수정
      // .andWhere("entity.record_ids IN :recordIds", { recordIds })
      .getMany();
    return result;
  }
}
