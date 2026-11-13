# DHMAINetRG

The website for the DHMAI Network Research Group. It contains information about
the research group, its members, projects, and publications.

## Updating members, projects, and publications

Edit `js/config.js`. It contains the site's data (`websiteData`) and the pages
are generated from it. Update an existing entry in place; don't make a second
copy of a member, project roster, or paper for another page.

### Add or update a member profile

Find `websiteData.team`. Add researchers to its `researchers` array, or update
the existing object there. Principal Investigator and External Advisor
profiles are stored separately as `principalInvestigator` and
`externalAdvisors`.

```js
{
  id: "NEWID", // unique; use this ID in project rosters and papers
  name: "Example Member",
  image: "images/example-member.webp",
  role: "Research Assistant",
  email: "member@example.com",
  github: "https://github.com/example", // optional
  linkedin: "https://www.linkedin.com/in/example", // optional
  bio: "Member biography.",
  experience: ["Research Assistant at DHMAINetRG (2026–Present)"],
}
```

Put the person's image file in `images` and set `image` to its path. Their
profile page is generated automatically. Researchers appear on Home by default;
set `hideFromHome: true` to hide one from Home, or `alumni: true` to show them
on Alumni instead. To update a profile, edit its object; its name, image, bio,
links, experience, and other profile details come from there.

### Add or update a project

Find the `projects` array in `websiteData`. Add a project object there, or edit
the existing one. Assign people in the project's `team` using their profile
IDs—not their names. These four lists determine the headings on the project
page:

```js
{
  id: "ExampleProject", // unique; also used as the project page ID
  name: "Example Project",
  shortDescription: "Short summary shown in project lists.",
  banner: "images/example-project.webp",
  description: "Full project description.",
  team: {
    principalInvestigator: ["DHMAI"],
    externalAdvisors: [],
    teamLeads: ["NEWID"],
    teamMembers: ["SMNS", "PA"],
  },
}
```

To add or remove a person from an existing project, change that project's
`team` list. The project page and each assigned member's profile project list
then update from the same roster. Do **not** add a `projects` array to a member
profile.

### Add or update a publication

Published papers go in `websiteData.publications.years`, under the appropriate
year. Under-review papers go in `websiteData.submittedPublications.years`.
Add the paper once to the relevant year's `items` array:

```js
{
  type: "conference", // "journal" or "conference"
  memberIds: ["NEWID", "DHMAI"], // profile IDs of this paper's group authors
  text: "Example Member and Hasan MA Islam. Example paper title. Conference, 2026.",
  link: "https://doi.org/example", // optional
  highlightForMember: {
    NEWID: ["Example Member"],
    DHMAI: ["Hasan MA Islam"],
  }, // use citation spellings to bold the author on each matching profile
}
```

For example, to add it under 2026, find the `year: "2026"` object and put this
paper inside its `items` array. Use the same `memberIds` IDs as the profiles.
The paper will appear on the group publication page and on each listed author's
profile. For an under-review paper, use the same fields in
`submittedPublications`; it will appear on the Under Review page and the
authors' profiles. On profiles, each author's name is bolded; when a citation
uses initials or a different spelling, add that exact spelling to
`highlightForMember`. The group publication page always shows the citation
without member-specific highlighting.

### Important checks

- IDs must be unique for members and projects. Once chosen, keep a member's ID
  the same when their name changes.
- Every ID in a project's `team` or a paper's `memberIds` must match a member
  ID in `websiteData.team`.
- Add new records to the existing year object when present; don't create a
  duplicate year.
- After editing, reload the site and check the member profile, project page,
  and publication page. The browser console reports unknown member IDs.
