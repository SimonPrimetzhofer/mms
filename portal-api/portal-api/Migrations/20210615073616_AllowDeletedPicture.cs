using Microsoft.EntityFrameworkCore.Migrations;

namespace portal_api.Migrations
{
    public partial class AllowDeletedPicture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RequestItems_Pictures_RelatedPicturePictureId",
                table: "RequestItems");

            migrationBuilder.AlterColumn<int>(
                name: "RelatedPicturePictureId",
                table: "RequestItems",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_RequestItems_Pictures_RelatedPicturePictureId",
                table: "RequestItems",
                column: "RelatedPicturePictureId",
                principalTable: "Pictures",
                principalColumn: "PictureId",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RequestItems_Pictures_RelatedPicturePictureId",
                table: "RequestItems");

            migrationBuilder.AlterColumn<int>(
                name: "RelatedPicturePictureId",
                table: "RequestItems",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_RequestItems_Pictures_RelatedPicturePictureId",
                table: "RequestItems",
                column: "RelatedPicturePictureId",
                principalTable: "Pictures",
                principalColumn: "PictureId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
