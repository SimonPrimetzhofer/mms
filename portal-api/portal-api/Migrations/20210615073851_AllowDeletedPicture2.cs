using Microsoft.EntityFrameworkCore.Migrations;

namespace portal_api.Migrations
{
    public partial class AllowDeletedPicture2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RequestItems_Pictures_RelatedPicturePictureId",
                table: "RequestItems");

            migrationBuilder.AddForeignKey(
                name: "FK_RequestItems_Pictures_RelatedPicturePictureId",
                table: "RequestItems",
                column: "RelatedPicturePictureId",
                principalTable: "Pictures",
                principalColumn: "PictureId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RequestItems_Pictures_RelatedPicturePictureId",
                table: "RequestItems");

            migrationBuilder.AddForeignKey(
                name: "FK_RequestItems_Pictures_RelatedPicturePictureId",
                table: "RequestItems",
                column: "RelatedPicturePictureId",
                principalTable: "Pictures",
                principalColumn: "PictureId",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
