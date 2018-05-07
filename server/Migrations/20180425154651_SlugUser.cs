using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PodNoms.Api.Migrations
{
    public partial class SlugUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Podcasts_UserDetails_UserId",
                table: "Podcasts");

            migrationBuilder.DropTable(
                name: "UserDetails");

            migrationBuilder.DropIndex(
                name: "IX_Podcasts_UserId",
                table: "Podcasts");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Podcasts");

            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Slug",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Podcasts",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ApiKey = table.Column<string>(maxLength: 50, nullable: true),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    EmailAddress = table.Column<string>(maxLength: 100, nullable: true),
                    FullName = table.Column<string>(maxLength: 100, nullable: true),
                    ProfileImage = table.Column<string>(nullable: true),
                    ProviderId = table.Column<string>(maxLength: 50, nullable: true),
                    RefreshToken = table.Column<string>(nullable: true),
                    Sid = table.Column<string>(maxLength: 50, nullable: true),
                    Slug = table.Column<string>(maxLength: 50, nullable: true),
                    Uid = table.Column<string>(maxLength: 50, nullable: true),
                    UpdateDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDetails", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Podcasts_UserId",
                table: "Podcasts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserDetails_Slug",
                table: "UserDetails",
                column: "Slug",
                unique: true,
                filter: "[Slug] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Podcasts_UserDetails_UserId",
                table: "Podcasts",
                column: "UserId",
                principalTable: "UserDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
