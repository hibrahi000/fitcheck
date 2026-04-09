-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'NON_BINARY', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "UnitSystem" AS ENUM ('IMPERIAL', 'METRIC');

-- CreateEnum
CREATE TYPE "MeasurementSource" AS ENUM ('SELF_REPORTED', 'PROFESSIONAL', 'ESTIMATED');

-- CreateEnum
CREATE TYPE "GarmentType" AS ENUM ('TOP', 'BOTTOM', 'DRESS', 'OUTERWEAR', 'SWIMWEAR', 'UNDERWEAR', 'SHOES', 'ACCESSORIES');

-- CreateEnum
CREATE TYPE "FitRating" AS ENUM ('TOO_SMALL', 'SLIGHTLY_SMALL', 'PERFECT', 'SLIGHTLY_LARGE', 'TOO_LARGE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMeasurement" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "chest" DECIMAL(65,30),
    "waist" DECIMAL(65,30),
    "hips" DECIMAL(65,30),
    "shoulder_width" DECIMAL(65,30),
    "arm_length" DECIMAL(65,30),
    "inseam" DECIMAL(65,30),
    "neck" DECIMAL(65,30),
    "height_inches" DECIMAL(65,30),
    "weight_lbs" DECIMAL(65,30),
    "unit_system" "UnitSystem" NOT NULL DEFAULT 'IMPERIAL',
    "source" "MeasurementSource" NOT NULL DEFAULT 'SELF_REPORTED',
    "recorded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_current" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SizeChart" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "brand_name" TEXT NOT NULL,
    "garment_type" "GarmentType" NOT NULL,
    "image_url" TEXT,
    "raw_ocr_text" TEXT,
    "extracted_data" JSONB,
    "source_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SizeChart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SizeRecommendation" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "size_chart_id" TEXT NOT NULL,
    "measurement_id" TEXT NOT NULL,
    "recommended_size" TEXT NOT NULL,
    "confidence_score" DECIMAL(65,30) NOT NULL,
    "fit_notes" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SizeRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseFeedback" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "recommendation_id" TEXT NOT NULL,
    "size_purchased" TEXT NOT NULL,
    "overall_fit" "FitRating" NOT NULL,
    "body_part_feedback" JSONB,
    "kept_item" BOOLEAN,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchaseFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrandCalibration" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "brand_name" TEXT NOT NULL,
    "garment_type" TEXT NOT NULL,
    "size_offset" JSONB,
    "confidence" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "last_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BrandCalibration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BrandCalibration_user_id_brand_name_garment_type_key" ON "BrandCalibration"("user_id", "brand_name", "garment_type");

-- AddForeignKey
ALTER TABLE "UserMeasurement" ADD CONSTRAINT "UserMeasurement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SizeChart" ADD CONSTRAINT "SizeChart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SizeRecommendation" ADD CONSTRAINT "SizeRecommendation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SizeRecommendation" ADD CONSTRAINT "SizeRecommendation_size_chart_id_fkey" FOREIGN KEY ("size_chart_id") REFERENCES "SizeChart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SizeRecommendation" ADD CONSTRAINT "SizeRecommendation_measurement_id_fkey" FOREIGN KEY ("measurement_id") REFERENCES "UserMeasurement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseFeedback" ADD CONSTRAINT "PurchaseFeedback_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseFeedback" ADD CONSTRAINT "PurchaseFeedback_recommendation_id_fkey" FOREIGN KEY ("recommendation_id") REFERENCES "SizeRecommendation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrandCalibration" ADD CONSTRAINT "BrandCalibration_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
