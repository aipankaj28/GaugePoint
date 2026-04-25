export interface DefectInsight {
    id: string;
    category: "Manufacturing Defect" | "QA Testing Defect";
    defectName: string;
    symptoms: string[];
    probableCauses: string[];
}

export const defectsData: DefectInsight[] = [
    {
        id: "m1",
        category: "Manufacturing Defect",
        defectName: "Uneven Wall Thickness (Eccentricity)",
        symptoms: ["One side of the pipe is thicker than the other", "Creating weak spots"],
        probableCauses: ["Misalignment of the die and mandrel", "Uneven heating of the die head", "Unstable extrusion pressure"]
    },
    {
        id: "m2",
        category: "Manufacturing Defect",
        defectName: "Less or More Wall Thickness",
        symptoms: ["Overall thickness of the pipe is either too little or too high compared to the standard requirement"],
        probableCauses: ["Wrong die tool gap/design (either too small or too large)"]
    },
    {
        id: "m3",
        category: "Manufacturing Defect",
        defectName: "Surface Roughness, Black Spot & Pitting",
        symptoms: ["Small visible irregularities", "Matte finish", "Orange peel texture"],
        probableCauses: ["Moisture in raw materials", "Low or high melt temperature", "Contaminated PVC compound", "Poor stability of the compound"]
    },
    {
        id: "m4",
        category: "Manufacturing Defect",
        defectName: "Internal Bubbles or Voids",
        symptoms: ["Empty spaces within the pipe wall that weaken structural integrity"],
        probableCauses: ["Trapped air during extrusion", "Moisture in the resin", "Thermal degradation due to overheating", "Poor stability of the compound"]
    },
    {
        id: "m5",
        category: "Manufacturing Defect",
        defectName: "Weld/Spider Lines",
        symptoms: ["Visible longitudinal lines where the molten plastic streams merge"],
        probableCauses: ["Incomplete fusion (gelation) of the plastic", "Worn-out HCP of spider legs in the die", "Excessive lubrication preventing a proper bond"]
    },
    {
        id: "m6",
        category: "Manufacturing Defect",
        defectName: "Yellowing or Burn Marks",
        symptoms: ["Dark streaks", "General discoloration"],
        probableCauses: ["Thermal degradation from excessive heat", "Material sitting too long in the extruder (high residence time)", "Poor stability of the compound"]
    },
    {
        id: "m7",
        category: "Manufacturing Defect",
        defectName: "Flowmarks",
        symptoms: ["Irregular inner surface of the pipe", "Wave-like uniform patterns observed"],
        probableCauses: ["Moisture in raw materials", "Low melt temperature", "Improper HCP of the die head and die tools", "Insufficient stabilizer"]
    },
    {
        id: "m8",
        category: "Manufacturing Defect",
        defectName: "Fishmarks",
        symptoms: ["Irregular white scales appearance on the outer surface of the pipe", "Visible to the eye but not fillable by hand"],
        probableCauses: ["Poor die design", "Higher shear stress", "Excessive melt temperature"]
    },
    {
        id: "m9",
        category: "Manufacturing Defect",
        defectName: "Crack Lines",
        symptoms: ["Crack observed on the OD or ID of pipes", "Generally observed in the ID"],
        probableCauses: ["Poor melting", "Over-lubrication", "Low extrusion pressure", "Moisture in the compound"]
    },
    {
        id: "m10",
        category: "Manufacturing Defect",
        defectName: "Barrel Vent Choking/Sucking",
        symptoms: ["Material frequently gets stuck in degassing ports", "Barrel vacuum stops working"],
        probableCauses: ["Excessive lubricants", "Material slippage in S/B", "Poor gelation"]
    },
    {
        id: "m11",
        category: "Manufacturing Defect",
        defectName: "Lumping",
        symptoms: ["Random lumping of material while extruding it from the die tool"],
        probableCauses: ["Material sticking in die gaps due to poor plating", "Eccentricity", "Misalignment of die tools", "Poor heaters at the die head or die tools", "Poor thermal stability of the compound"]
    },
    {
        id: "q1",
        category: "QA Testing Defect",
        defectName: "VST Failure",
        symptoms: ["Indicates the thermal stability/heat resistance of the PVC pipe"],
        probableCauses: ["Optimum fusion should be achieved during processing", "Avoid excessive melt temperature and melt pressure"]
    },
    {
        id: "q2",
        category: "QA Testing Defect",
        defectName: "Tensile Strength",
        symptoms: ["Indicates the elasticity/ductility of the pipe and mechanical strength"],
        probableCauses: ["Poor fusion", "Over-fusion"]
    },
    {
        id: "q3",
        category: "QA Testing Defect",
        defectName: "HPT Failure",
        symptoms: ["Helps understand pipe performance under high-pressure applications and indicates mechanical strength"],
        probableCauses: ["Poor gelation", "Low melt temperature and melt pressure", "Low barrel vacuum", "Low extruder load during processing", "Contamination in the PVC compound"]
    },
    {
        id: "q4",
        category: "QA Testing Defect",
        defectName: "Impact Test Failure",
        symptoms: ["Ideally should range within 10% by TIR", "Determines the mechanical strength of the pipes at extreme 0-degree conditions"],
        probableCauses: ["Poor gelation", "Low melt temperature and melt pressure", "Low barrel vacuum", "Low extruder load during processing"]
    },
    {
        id: "q5",
        category: "QA Testing Defect",
        defectName: "Reversion Failure",
        symptoms: ["Ideally should range within 5%", "Determines the thermal stress left in the pipe"],
        probableCauses: ["Improper die gap", "Poor cooling of the pipe at the sizer and VST", "Poor alignment of sizer and VST spray nozzles"]
    }
];
