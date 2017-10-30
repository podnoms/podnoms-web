using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace PodNoms.Api.Migrations
{
    public partial class UidInPodcastAndRemoveImageUrl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Podcasts");

            migrationBuilder.AddColumn<string>(
                name: "Uid",
                table: "Podcasts",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Uid",
                table: "Podcasts");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Podcasts",
                nullable: true);
        }
    }
}
