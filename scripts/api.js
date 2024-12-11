export class Material {
    constructor(Type, RefractionIndex = 1) {
        this.Type = Type;
        this.RefractionIndex = RefractionIndex;
    }

    static GenerateMaterialShape(X, Y, Width, Height, Color, Material) {
        const Element = document.createElement("div");
        Element.style.position = "absolute";
        Element.style.left = `${X}px`;
        Element.style.top = `${Y}px`;
        Element.style.width = `${Width}px`;
        Element.style.height = `${Height}px`;
        Element.style.backgroundColor = Color;
        Element.innerHTML = Material.Type;
        Element.classList.add("Material");
        Element.setAttribute("data-material", Material.Type);
        Element.setAttribute("data-refraction-index", Material.RefractionIndex);
        document.body.appendChild(Element);
    }
}

export class Ray {
    constructor(RayData = { Origin: { X: 0, Y: 0 }, Direction: { Angle: 0 }, Speed: 1 }) {
        this.RayData = RayData;
        this.LightRay = document.createElement("div");
        this.LightRay.classList.add("LightRay");
        document.body.appendChild(this.LightRay);

        this.LightRayLabel = document.createElement("span");
        this.LightRay.appendChild(this.LightRayLabel);
    }

    CastRay() {
        const RayOrigin = this.RayData.Origin;
        let RayDirection = this.RayData.Direction;

        let CurrentX = RayOrigin.X;
        let CurrentY = RayOrigin.Y;

        const RayLoop = () => {
            const Radians = RayDirection.Angle * (Math.PI / 180);
            CurrentX += Math.cos(Radians) * this.RayData.Speed;
            CurrentY += Math.sin(Radians) * this.RayData.Speed;

            const HitElement = document.elementFromPoint(CurrentX, CurrentY);
            if (HitElement?.classList.contains("Material")) {
                const MaterialType = HitElement.getAttribute("data-material");
                const RefractionIndex = parseFloat(HitElement.getAttribute("data-refraction-index")) || 1;

                if (MaterialType === "Solid") {
                    RayDirection.Angle = -this.RayData.Direction.Angle + 180;
                } else if (MaterialType !== "Solid") {
                    RayDirection.Angle += (1 - RefractionIndex) * 4;
                    this.RayData.Speed /= RefractionIndex * 0.985;
                }
            }

            if (CurrentX > window.innerWidth || CurrentY > window.innerHeight) this.LightRay.remove();

            this.LightRay.style.left = `${CurrentX}px`;
            this.LightRay.style.top = `${CurrentY}px`;

            this.LightRayLabel.textContent = `V:${this.RayData.Speed.toFixed(2)}`;

            const RayEffect = document.createElement("div");
            RayEffect.style.position = "absolute";
            RayEffect.style.backgroundColor = "rgb(255, 255, 255)";
            RayEffect.style.aspectRatio = "1";
            RayEffect.style.width = "5px";
            RayEffect.style.left = `${CurrentX}px`;
            RayEffect.style.top = `${CurrentY}px`;
            RayEffect.style.pointerEvents = "none";
            //document.body.appendChild(RayEffect);

            requestAnimationFrame(RayLoop);
        };

        requestAnimationFrame(RayLoop);
    }
}