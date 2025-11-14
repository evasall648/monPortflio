"use client"

import type React from "react"
import { useState, useEffect, ChangeEvent } from "react"
import { Card, CardContent, CardFooter } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { Label } from "../../../components/ui/label"
import { Plus, Search, Edit, Trash2, Eye, Home, MapPin, Euro, Building2 } from "lucide-react"
import { useToast } from "../../../components/ui/use-toast"
import { MdEdit, MdDelete, MdViewList, MdViewModule } from "react-icons/md"
import { AgentSidebar } from "@/components/agent"

// ... (le reste du contenu du fichier reste inchangé)
