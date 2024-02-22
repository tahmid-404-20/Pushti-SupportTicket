const supabase = require("./db.js");
const router = require("express").Router();

router.get("/farmer", async (req, res) => {
  try {
    let response = await supabase.any(`select
      "ticketId", "subject", "details", "time", "status", "readStatus", "userId", "userType", "name", "avatarLink", "rank", "points", "UnionParishad", "Upazilla", "District", "Division"
     from
       ((
         (
           select
             "id" as "ticketId",
             "subject",
             "details",
             "time",
             "status",
             "readStatus",
             "userId"
           from
             "SupportTicket"
           where
             "userType" = 'farmer'
         ) as A
         join (
           select
             "id",
             "name",
             "avatarLink",
             "userType",
             "unionId"
           from
             "User"
         ) as B on A."userId" = B."id"
       ) as C
       join (
         select
           "rank",
           "points",
           "farmerType",
           "id"
         from
           "Farmer"
       ) as D on D."id" = C."userId") as E join (
         select
         up.id as "unionId",
         up.name as "UnionParishad",
         uz.name as "Upazilla",
         dt.name as "District",
         dv.name as "Division"
       from
         "UnionParishad" up
         join "Upazilla" uz on up."upazillaId" = uz."id"
         join "District" dt on uz."districtId" = dt."id"
         join "Division" dv on dt."divisionId" = dv."id"
       ) as F on F."unionId" = E."unionId"
     order by
       E."time" desc;`);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/vendor", async (req, res) => {
  try {
    let response = await supabase.any(`select
        "ticketId", "subject", "details", "time", "status", "readStatus", "userId", "userType", "name", "avatarLink", "rank", "points", "UnionParishad", "Upazilla", "District", "Division"
       from
         ((
           (
             select
               "id" as "ticketId",
               "subject",
               "details",
               "time",
               "status",
               "readStatus",
               "userId"
             from
               "SupportTicket"
             where
               "userType" = 'vendor'
           ) as A
           join (
             select
               "id",
               "name",
               "avatarLink",
               "userType",
               "unionId"
             from
               "User"
           ) as B on A."userId" = B."id"
         ) as C
         join (
           select
             "rank",
             "points",
             "id"
           from
             "Vendor"
         ) as D on D."id" = C."userId") as E join (
           select
           up.id as "unionId",
           up.name as "UnionParishad",
           uz.name as "Upazilla",
           dt.name as "District",
           dv.name as "Division"
         from
           "UnionParishad" up
           join "Upazilla" uz on up."upazillaId" = uz."id"
           join "District" dt on uz."districtId" = dt."id"
           join "Division" dv on dt."divisionId" = dv."id"
         ) as F on F."unionId" = E."unionId"
       order by
         E."time" desc;`);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/sme", async (req, res) => {
  try {
    let response = await supabase.any(`select
        "ticketId", "subject", "details", "time", "status", "readStatus", "userId", "userType", "name", "avatarLink", "rank", "points", "UnionParishad", "Upazilla", "District", "Division"
       from
         ((
           (
             select
               "id" as "ticketId",
               "subject",
               "details",
               "time",
               "status",
               "readStatus",
               "userId"
             from
               "SupportTicket"
             where
               "userType" = 'sme'
           ) as A
           join (
             select
               "id",
               "name",
               "avatarLink",
               "userType",
               "unionId"
             from
               "User"
           ) as B on A."userId" = B."id"
         ) as C
         join (
           select
             "rank",
             "points",
             "id"
           from
             "Sme"
         ) as D on D."id" = C."userId") as E join (
           select
           up.id as "unionId",
           up.name as "UnionParishad",
           uz.name as "Upazilla",
           dt.name as "District",
           dv.name as "Division"
         from
           "UnionParishad" up
           join "Upazilla" uz on up."upazillaId" = uz."id"
           join "District" dt on uz."districtId" = dt."id"
           join "Division" dv on dt."divisionId" = dv."id"
         ) as F on F."unionId" = E."unionId"
       order by
         E."time" desc;`);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/agent", async (req, res) => {
  try {
    let response = await supabase.any(`select
        "ticketId", "subject", "details", "time", "status", "readStatus", "userId", "userType", "name", "avatarLink", "UnionParishad", "Upazilla", "District", "Division"
       from
         (
           (
             select
               "id" as "ticketId",
               "subject",
               "details",
               "time",
               "status",
               "readStatus",
               "userId"
             from
               "SupportTicket"
             where
               "userType" = 'farmer'
           ) as A
           join (
             select
               "id",
               "name",
               "avatarLink",
               "userType",
               "unionId"
             from
               "User"
           ) as B on A."userId" = B."id"
         ) C join (
           select
           up.id as "unionId",
           up.name as "UnionParishad",
           uz.name as "Upazilla",
           dt.name as "District",
           dv.name as "Division"
         from
           "UnionParishad" up
           join "Upazilla" uz on up."upazillaId" = uz."id"
           join "District" dt on uz."districtId" = dt."id"
           join "Division" dv on dt."divisionId" = dv."id"
         ) as F on F."unionId" = C."unionId"
       order by
         C."time" desc;`);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
