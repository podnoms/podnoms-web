using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PodNoms.Api.Migrations
{
    public partial class JiggleUserModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Podcasts",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Podcasts_AppUserId",
                table: "Podcasts",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Podcasts_AspNetUsers_AppUserId",
                table: "Podcasts",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Podcasts_AspNetUsers_AppUserId",
                table: "Podcasts");

            migrationBuilder.DropIndex(
                name: "IX_Podcasts_AppUserId",
                table: "Podcasts");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Podcasts");
        }
    }
}
