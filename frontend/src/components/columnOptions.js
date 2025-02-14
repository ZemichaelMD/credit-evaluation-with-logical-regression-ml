const columnOptions = [
    {
        "id": "checking_status",
        "name": "Checking Status",
        "description": "The checking status of the applicant", 
        "type": "select",
        "options": [
          {value:"'no checking'", label:"No checking account"},
          {value:"0<=X<200", label:"Between 0 and 200 ETB"},
          {value:"<0", label:"Less than 0 ETB"},
          {value:">=200", label:"200 ETB or more"}
        ]
      },
      {
        "id": "duration",
        "name": "Duration",
        "description": "Duration",
        "type": "number"
      },
      {
        "id": "credit_history",
        "name": "Credit History",
        "description": "Credit history of the applicant",
        "type": "select", 
        "options": [
          {value:"'all paid'", label:"All credits paid back"},
          {value:"'critical/other existing credit'", label:"Critical account/Other credits exist"},
          {value:"'delayed previously'", label:"Delayed payments in the past"},
          {value:"'existing paid'", label:"Existing credits paid back"},
          {value:"'no credits/all paid'", label:"No credits taken/all credits paid back"}
        ]
      },
      {
        "id": "purpose",
        "name": "Purpose",
        "description": "Purpose of credit",
        "type": "select",
        "options": [
          {value:"'domestic appliance'", label:"Domestic appliances"},
          {value:"'new car'", label:"New car purchase"},
          {value:"'used car'", label:"Used car purchase"},
          {value:"business", label:"Business purposes"},
          {value:"education", label:"Education"},
          {value:"furniture/equipment", label:"Furniture or equipment"},
          {value:"other", label:"Other purposes"},
          {value:"radio/tv", label:"Radio or television"},
          {value:"repairs", label:"Repairs"},
          {value:"retraining", label:"Professional retraining"}
        ]
      },
      {
        "id": "credit_amount",
        "name": "Credit Amount",
        "description": "Credit amount",
        "type": "number"
      },
      {
        "id": "savings_status",
        "name": "Savings Status",
        "description": "Savings status",
        "type": "select",
        "options": [
          {value:"'no known savings'", label:"No known savings"},
          {value:"100<=X<500", label:"Between 100 and 500 ETB"},
          {value:"500<=X<1000", label:"Between 500 and 1000 ETB"},
          {value:"<100", label:"Less than 100 ETB"},
          {value:">=1000", label:"1000 ETB or more"}
        ]
      },
      {
        "id": "employment",
        "name": "Employment",
        "description": "Employment status",
        "type": "select",
        "options": [
          {value:"1<=X<4", label:"Between 1 and 4 years"},
          {value:"4<=X<7", label:"Between 4 and 7 years"},
          {value:"<1", label:"Less than 1 year"},
          {value:">=7", label:"7 years or more"},
          {value:"unemployed", label:"Currently unemployed"}
        ]
      },
      {
        "id": "installment_commitment",
        "name": "Installment Commitment",
        "description": "Installment commitment",
        "type": "select",
        "options": [
          {value:"1", label:"1% of disposable income"},
          {value:"2", label:"2% of disposable income"},
          {value:"3", label:"3% of disposable income"},
          {value:"4", label:"4% of disposable income"}
        ]
      },
      {
        "id": "personal_status",
        "name": "Personal Status",
        "description": "Personal status",
        "type": "select",
        "options": [
          {value:"'female div/dep/mar'", label:"Female: divorced, separated or married"},
          {value:"'male div/sep'", label:"Male: divorced or separated"},
          {value:"'male mar/wid'", label:"Male: married or widowed"},
          {value:"'male single'", label:"Male: single"}
        ]
      },
      {
        "id": "other_parties",
        "name": "Other Parties",
        "description": "Other parties",
        "type": "select",
        "options": [
          {value:"'co applicant'", label:"Co-applicant present"},
          {value:"guarantor", label:"Guarantor present"},
          {value:"none", label:"No co-applicant or guarantor"}
        ]
      },
      {
        "id": "residence_since",
        "name": "Residence Since",
        "description": "Residence since",
        "type": "select",
        "options": [
          {value:"1", label:"1 year"},
          {value:"2", label:"2 years"},
          {value:"3", label:"3 years"},
          {value:"4", label:"4 or more years"}
        ]
      },
      {
        "id": "property_magnitude",
        "name": "Property Magnitude",
        "description": "Property magnitude",
        "type": "select",
        "options": [
          {value:"'life insurance'", label:"Life insurance"},
          {value:"'no known property'", label:"No known property"},
          {value:"'real estate'", label:"Real estate"},
          {value:"car", label:"Car ownership"}
        ]
      },
      {
        "id": "age",
        "name": "Age",
        "description": "Age of applicant",
        "type": "number",
        "min": 18,
        "max": 60
      },
      {
        "id": "other_payment_plans",
        "name": "Other Payment Plans",
        "description": "Other payment plans",
        "type": "select",
        "options": [
          {value:"bank", label:"Bank payment plan"},
          {value:"none", label:"No payment plans"},
          {value:"stores", label:"Store payment plan"}
        ]
      },
      {
        "id": "housing",
        "name": "Housing",
        "description": "Housing status",
        "type": "select",
        "options": [
          {value:"'for free'", label:"Free housing"},
          {value:"own", label:"Own house/apartment"},
          {value:"rent", label:"Rented house/apartment"}
        ]
      },
      {
        "id": "existing_credits",
        "name": "Existing Credits",
        "description": "Existing credits",
        "type": "select",
        "options": [
          {value:"1", label:"One existing credit"},
          {value:"2", label:"Two existing credits"},
          {value:"3", label:"Three existing credits"},
          {value:"4", label:"Four or more existing credits"}
        ]
      },
      {
        "id": "job",
        "name": "Job",
        "description": "Job type",
        "type": "select",
        "options": [
          {value:"'high qualif/self emp/mgmt'", label:"Highly qualified/self-employed/management"},
          {value:"'unemp/unskilled non res'", label:"Unemployed/unskilled non-resident"},
          {value:"'unskilled resident'", label:"Unskilled resident"},
          {value:"skilled", label:"Skilled employee"}
        ]
      },
      {
        "id": "num_dependents",
        "name": "Number of Dependents",
        "description": "Number of dependents",
        "type": "select",
        "options": [
          {value:"1", label:"One dependent"},
          {value:"2", label:"Two or more dependents"}
        ]
      },
      {
        "id": "own_telephone",
        "name": "Own Telephone",
        "description": "Own telephone",
        "type": "select",
        "options": [
          {value:"none", label:"No telephone"},
          {value:"yes", label:"Has telephone"}
        ]
      },
      {
        "id": "foreign_worker",
        "name": "Foreign Worker",
        "description": "Foreign worker status",
        "type": "select",
        "options": [
          {value:"no", label:"Not a foreign worker"},
          {value:"yes", label:"Foreign worker"}
        ]
      },
      {
        "id": "class",
        "name": "Class",
        "description": "Class of applicant",
        "type": "select",
        "options": [
          {value:"bad", label:"Bad credit risk"},
          {value:"good", label:"Good credit risk"}
        ]
      }
  ]

export default columnOptions;