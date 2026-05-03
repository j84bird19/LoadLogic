import React, { useMemo, useState } from "react"; import { ArrowLeft, Box, FolderOpen, Hammer, LogIn, Plus, Save, Truck, User } from "lucide-react"; import { Button } from "@/components/ui/button"; import { Card, CardContent } from "@/components/ui/card";

// FILE: app/page.tsx // Place this file inside a Next.js app router project. // // REQUIRED INSTALLS: // npm install lucide-react // // OPTIONAL (recommended): // npx shadcn-ui@latest init // npx shadcn-ui@latest add button card // // TAILWIND REQUIRED. // // GITHUB STARTER FILES: // // package.json // { //   "name": "loadlogic", //   "version": "0.1.0", //   "private": true, //   "scripts": { //     "dev": "next dev", //     "build": "next build", //     "start": "next start" //   }, //   "dependencies": { //     "lucide-react": "latest", //     "next": "latest", //     "react": "latest", //     "react-dom": "latest" //   } // } // // GITHUB SETUP: // 1. Create new GitHub repo named: loadlogic // 2. Create Next.js app locally: //    npx create-next-app@latest loadlogic // 3. Replace app/page.tsx with this file // 4. Push to GitHub: //    git init //    git add . //    git commit -m "Initial LoadLogic shell" //    git branch -M main //    git remote add origin YOUR_GITHUB_REPO //    git push -u origin main

export default function LoadLogicAppShell() { const [page, setPage] = useState("login"); const [userName, setUserName] = useState("Bird"); const [currentProject, setCurrentProject] = useState(null);

const [setup, setSetup] = useState({ projectName: "New LoadLogic Project", truckMake: "Ford", truckModel: "F-150", truckYear: "2020", bedSize: "6.5 ft", viewMode: "2D", workMode: "Load", });

const savedProjects = useMemo( () => [ { id: 1, name: "Contractor Drawer Setup", truck: "2020 Ford F-150 - 6.5 ft bed", viewMode: "2D", workMode: "Build", lastEdited: "Today", }, { id: 2, name: "Moving Day Layout", truck: "2018 Chevy Silverado - 5.8 ft bed", viewMode: "2D", workMode: "Load", lastEdited: "Yesterday", }, ], [] );

function openSaved(project) { setCurrentProject(project); setPage("workspace"); }

function startNewProject() { setCurrentProject(null); setPage("setup"); }

function launchWorkspace() { const project = { id: Date.now(), name: setup.projectName, truck: ${setup.truckYear} ${setup.truckMake} ${setup.truckModel} - ${setup.bedSize} bed, viewMode: setup.viewMode, workMode: setup.workMode, lastEdited: "Now", }; setCurrentProject(project); setPage("workspace"); }

return ( <div className="min-h-screen bg-slate-950 p-4 text-white"> <div className="mx-auto max-w-6xl"> <Header page={page} setPage={setPage} />

{page === "login" && (
      <LoginPage
        userName={userName}
        setUserName={setUserName}
        onLogin={() => setPage("dashboard")}
      />
    )}

    {page === "dashboard" && (
      <DashboardPage
        userName={userName}
        savedProjects={savedProjects}
        onOpenSaved={openSaved}
        onStartNew={startNewProject}
      />
    )}

    {page === "setup" && (
      <SetupPage
        setup={setup}
        setSetup={setSetup}
        onLaunch={launchWorkspace}
        onBack={() => setPage("dashboard")}
      />
    )}

    {page === "workspace" && (
      <WorkspacePage project={currentProject} onBack={() => setPage("dashboard")} />
    )}
  </div>
</div>

); }

function Header({ page, setPage }) { return ( <div className="mb-5 flex items-center justify-between gap-3"> <div className="flex items-center gap-3"> <div className="rounded-2xl bg-orange-500 p-3 shadow-lg shadow-orange-500/20"> <Truck className="h-7 w-7" /> </div> <div> <h1 className="text-3xl font-black tracking-tight">LoadLogic</h1> <p className="text-sm text-slate-400">Truck bed loading and build simulation</p> </div> </div>

{page !== "login" && (
    <Button variant="secondary" className="rounded-xl" onClick={() => setPage("dashboard")}>
      Dashboard
    </Button>
  )}
</div>

); }

function LoginPage({ userName, setUserName, onLogin }) { return ( <div className="grid min-h-[70vh] place-items-center"> <Card className="w-full max-w-md rounded-3xl border-slate-800 bg-slate-900 text-white shadow-2xl"> <CardContent className="space-y-5 p-6"> <div className="space-y-2 text-center"> <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-orange-500/20"> <LogIn className="h-8 w-8 text-orange-400" /> </div> <h2 className="text-2xl font-bold">Welcome to LoadLogic</h2> <p className="text-sm text-slate-400">Login so projects, builds, and custom items can be saved.</p> </div>

<div className="space-y-2">
        <label className="text-sm text-slate-300">Display Name</label>
        <input
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-orange-400"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <Button className="w-full rounded-xl bg-orange-500 hover:bg-orange-600" onClick={onLogin}>
        Login / Continue
      </Button>

      <p className="text-center text-xs text-slate-500">Prototype login only. Real account saving comes later.</p>
    </CardContent>
  </Card>
</div>

); }

function DashboardPage({ userName, savedProjects, onOpenSaved, onStartNew }) { return ( <div className="space-y-5"> <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5"> <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"> <div className="flex items-center gap-3"> <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-800"> <User className="h-6 w-6 text-orange-400" /> </div> <div> <h2 className="text-2xl font-bold">{userName}'s Dashboard</h2> <p className="text-sm text-slate-400">Open a saved project or start a new truck setup.</p> </div> </div>

<Button className="rounded-xl bg-orange-500 hover:bg-orange-600" onClick={onStartNew}>
        <Plus className="mr-2 h-4 w-4" /> Start New Project
      </Button>
    </div>
  </div>

  <div className="grid gap-4 md:grid-cols-3">
    <MiniStat icon={<FolderOpen className="h-5 w-5" />} label="Saved Projects" value="2" />
    <MiniStat icon={<Hammer className="h-5 w-5" />} label="Saved Builds" value="0" />
    <MiniStat icon={<Box className="h-5 w-5" />} label="Saved Items" value="0" />
  </div>

  <div>
    <h3 className="mb-3 text-xl font-bold">Saved Projects</h3>
    <div className="grid gap-4 md:grid-cols-2">
      {savedProjects.map((project) => (
        <Card key={project.id} className="rounded-3xl border-slate-800 bg-slate-900 text-white">
          <CardContent className="space-y-4 p-5">
            <div>
              <h4 className="text-lg font-bold">{project.name}</h4>
              <p className="text-sm text-slate-400">{project.truck}</p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-slate-800 px-3 py-1">{project.viewMode}</span>
              <span className="rounded-full bg-slate-800 px-3 py-1">{project.workMode} Mode</span>
              <span className="rounded-full bg-slate-800 px-3 py-1">Edited: {project.lastEdited}</span>
            </div>

            <Button className="w-full rounded-xl" variant="secondary" onClick={() => onOpenSaved(project)}>
              Open Saved Project
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</div>

); }

function MiniStat({ icon, label, value }) { return ( <Card className="rounded-3xl border-slate-800 bg-slate-900 text-white"> <CardContent className="flex items-center gap-4 p-5"> <div className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-500/15 text-orange-400">{icon}</div> <div> <div className="text-2xl font-black">{value}</div> <div className="text-sm text-slate-400">{label}</div> </div> </CardContent> </Card> ); }

function SetupPage({ setup, setSetup, onLaunch, onBack }) { function update(field, value) { setSetup((prev) => ({ ...prev, [field]: value })); }

return ( <div className="space-y-5"> <Button variant="ghost" className="rounded-xl text-slate-300" onClick={onBack}> <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard </Button>

<Card className="rounded-3xl border-slate-800 bg-slate-900 text-white">
    <CardContent className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold">Start New Project</h2>
        <p className="text-sm text-slate-400">Choose truck info, view mode, and work mode.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Project Name" value={setup.projectName} onChange={(v) => update("projectName", v)} />
        <Field label="Truck Year" value={setup.truckYear} onChange={(v) => update("truckYear", v)} />
        <Field label="Truck Make" value={setup.truckMake} onChange={(v) => update("truckMake", v)} />
        <Field label="Truck Model" value={setup.truckModel} onChange={(v) => update("truckModel", v)} />
        <SelectField
          label="Bed Size"
          value={setup.bedSize}
          onChange={(v) => update("bedSize", v)}
          options={["5.5 ft", "5.8 ft", "6 ft", "6.5 ft", "8 ft", "Custom"]}
        />
        <SelectField
          label="View Mode"
          value={setup.viewMode}
          onChange={(v) => update("viewMode", v)}
          options={["2D", "3D Later"]}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">Choose Mode</label>
        <div className="grid gap-3 md:grid-cols-2">
          <ModeCard
            active={setup.workMode === "Load"}
            title="Load Mode"
            description="Plan furniture, appliances, equipment, tools, and cargo placement."
            icon={<Box className="h-6 w-6" />}
            onClick={() => update("workMode", "Load")}
          />
          <ModeCard
            active={setup.workMode === "Build"}
            title="Build Mode"
            description="Create drawers, frames, racks, shelves, mounts, and saved custom builds."
            icon={<Hammer className="h-6 w-6" />}
            onClick={() => update("workMode", "Build")}
          />
        </div>
      </div>

      <Button className="w-full rounded-xl bg-orange-500 hover:bg-orange-600" onClick={onLaunch}>
        Launch Workspace
      </Button>
    </CardContent>
  </Card>
</div>

); }

function Field({ label, value, onChange }) { return ( <div className="space-y-2"> <label className="text-sm text-slate-300">{label}</label> <input className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-orange-400" value={value} onChange={(e) => onChange(e.target.value)} /> </div> ); }

function SelectField({ label, value, options, onChange }) { return ( <div className="space-y-2"> <label className="text-sm text-slate-300">{label}</label> <select className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-orange-400" value={value} onChange={(e) => onChange(e.target.value)} > {options.map((option) => ( <option key={option} value={option}> {option} </option> ))} </select> </div> ); }

function ModeCard({ active, title, description, icon, onClick }) { return ( <button onClick={onClick} className={rounded-3xl border p-5 text-left transition ${ active ? "border-orange-400 bg-orange-500/15" : "border-slate-800 bg-slate-950 hover:border-slate-600" }} > <div className="mb-3 text-orange-400">{icon}</div> <h3 className="text-lg font-bold">{title}</h3> <p className="text-sm text-slate-400">{description}</p> </button> ); }

function WorkspacePage({ project, onBack }) { return ( <div className="space-y-5"> <div className="flex flex-wrap items-center justify-between gap-3"> <Button variant="ghost" className="rounded-xl text-slate-300" onClick={onBack}> <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard </Button> <Button variant="secondary" className="rounded-xl"> <Save className="mr-2 h-4 w-4" /> Save Project </Button> </div>

<div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
    <h2 className="text-2xl font-bold">{project?.name || "Untitled Project"}</h2>
    <p className="text-sm text-slate-400">{project?.truck}</p>
    <div className="mt-3 flex flex-wrap gap-2 text-xs">
      <span className="rounded-full bg-slate-800 px-3 py-1">{project?.viewMode}</span>
      <span className="rounded-full bg-slate-800 px-3 py-1">{project?.workMode} Mode</span>
    </div>
  </div>

  <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
    <Card className="rounded-3xl border-slate-800 bg-slate-900 text-white">
      <CardContent className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">2D Truck Bed Workspace</h3>
          <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs text-orange-300">Prototype</span>
        </div>

        <div className="relative mx-auto aspect-[16/9] max-w-3xl rounded-3xl border-4 border-slate-600 bg-slate-800 p-6">
          <div className="absolute left-4 top-1/2 h-24 w-10 -translate-y-1/2 rounded-xl bg-slate-950" />
          <div className="absolute right-4 top-1/2 h-24 w-10 -translate-y-1/2 rounded-xl bg-slate-950" />
          <div className="grid h-full place-items-center rounded-2xl border border-dashed border-slate-500 text-center">
            <div>
              <Truck className="mx-auto mb-3 h-10 w-10 text-orange-400" />
              <p className="font-bold">Truck bed simulator goes here next.</p>
              <p className="text-sm text-slate-400">Next step: add draggable measured boxes.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="rounded-3xl border-slate-800 bg-slate-900 text-white">
      <CardContent className="space-y-4 p-5">
        <h3 className="text-lg font-bold">Side Panel</h3>
        <Button className="w-full rounded-xl" variant="secondary">
          <Plus className="mr-2 h-4 w-4" /> Add Item / Material
        </Button>
        <Button className="w-full rounded-xl" variant="secondary">
          <FolderOpen className="mr-2 h-4 w-4" /> Saved Builds
        </Button>
        <div className="rounded-2xl bg-slate-950 p-4 text-sm text-slate-400">
          {project?.workMode === "Build"
            ? "Build Mode will use this panel for materials, dimensions, attachment methods, and saved custom builds."
            : "Load Mode will use this panel for furniture, appliances, tools, equipment, and saved custom items."}
        </div>
      </CardContent>
    </Card>
  </div>
</div>

); }
