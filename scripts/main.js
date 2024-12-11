import * as Api from "./api.js";

for (let Index = 0; Index < 45; Index++) {
    const MyRay = new Api.Ray({
        Origin: { X: 0, Y: 0 },
        Direction: { Angle: Index * 2 },
        Speed: 4
    });
    MyRay.CastRay();
}

//Api.Material.GenerateMaterialShape(500, 100, 100, 100, "rgb(155, 155, 155)", new Material("Solid"));
Api.Material.GenerateMaterialShape(500, 100, 100, 100, "rgba(155, 155, 255, 0.25)", new Api.Material("Ethanol", 1.0125));
Api.Material.GenerateMaterialShape(400, 200, 100, 100, "rgba(155, 155, 255, 0.5)", new Api.Material("Glass", 1.025));
Api.Material.GenerateMaterialShape(300, 300, 100, 100, "rgba(155, 155, 255, 0.25)", new Api.Material("Water", 1.03));
Api.Material.GenerateMaterialShape(200, 400, 100, 100, "rgba(255, 255, 255, 0.5)", new Api.Material("Glycerin", 1.045));