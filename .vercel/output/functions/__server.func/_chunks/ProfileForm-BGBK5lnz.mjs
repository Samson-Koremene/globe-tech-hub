import { i as __toESM } from "../_runtime.mjs";
import { n as useForm, r as require_react, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { a as unionType, i as stringType, n as literalType, r as objectType } from "../_libs/zod.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as updateMyProfile, v as uploadAvatar } from "./Skeletons-DrV2HNKr.mjs";
import { t as MemberAvatar } from "./MemberAvatar-D9lX1-Ub.mjs";
import { t as MemberCard } from "./MemberCard-DlxhlQPk.mjs";
//#region dist/server/assets/ProfileForm-BGBK5lnz.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
var CARD_COLORS = [
	{
		id: "default",
		bg: "bg-primary"
	},
	{
		id: "violet",
		bg: "bg-violet-500"
	},
	{
		id: "emerald",
		bg: "bg-emerald-500"
	},
	{
		id: "rose",
		bg: "bg-rose-500"
	},
	{
		id: "amber",
		bg: "bg-amber-500"
	},
	{
		id: "sky",
		bg: "bg-sky-500"
	}
];
var CARD_STYLES = [
	{
		id: "soft",
		label: "Soft"
	},
	{
		id: "dark",
		label: "Dark"
	},
	{
		id: "minimal",
		label: "Minimal"
	}
];
function CardStylePicker({ color, onChangeColor, style, onChangeStyle, profile }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative overflow-hidden rounded-2xl border border-hairline bg-surface/30 p-6 sm:p-10 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none w-full max-w-[340px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberCard, { profile: {
						...profile,
						card_color: color,
						card_style: style
					} })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-sm font-medium",
					children: "Color Palette"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-3",
					children: CARD_COLORS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onChangeColor(c.id),
						className: `relative flex h-16 w-20 items-center justify-center rounded-[14px] border transition-all ${color === c.id ? "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm" : "border-hairline bg-surface hover:bg-surface-2"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-8 w-8 rounded-full shadow-sm ${c.bg} ${c.id === "default" ? "" : "opacity-90"}` }), color === c.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-[22px] w-[22px] items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, { className: "h-3 w-3 text-foreground" })
							})
						})]
					}, c.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-sm font-medium",
					children: "Card Style"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-4",
					children: CARD_STYLES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onChangeStyle(s.id),
						className: `group relative flex h-[110px] flex-col items-center justify-end overflow-hidden rounded-2xl border transition-all pb-4 ${style === s.id ? "border-primary ring-1 ring-primary/20" : "border-hairline hover:border-primary/40"} ${s.id === "soft" ? "bg-gradient-to-br from-surface to-surface-2" : s.id === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-background"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `text-sm font-medium ${s.id === "dark" ? "text-white" : "text-foreground"}`,
							children: s.label
						}), style === s.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full shadow-sm ${s.id === "dark" ? "bg-white text-zinc-900" : "bg-primary text-primary-foreground"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, {
								className: "h-[10px] w-[10px]",
								strokeWidth: 3
							})
						})]
					}, s.id))
				})]
			})
		]
	});
}
var profileSchema = objectType({
	firstName: stringType().min(1, "First name is required").max(50, "First name is too long"),
	lastName: stringType().min(1, "Last name is required").max(50, "Last name is too long"),
	tagline: stringType().max(140, "Tagline must be 140 characters or less").optional(),
	occupation: stringType().max(100).optional(),
	location: stringType().max(100).optional(),
	bio: stringType().max(800, "Bio must be 800 characters or less").optional(),
	passions: stringType().optional(),
	hobbies: stringType().optional(),
	website: unionType([literalType(""), stringType().url("Must be a valid URL")]).optional(),
	twitter: unionType([literalType(""), stringType().url("Must be a valid URL")]).optional(),
	github: unionType([literalType(""), stringType().url("Must be a valid URL")]).optional(),
	linkedin: unionType([literalType(""), stringType().url("Must be a valid URL")]).optional()
});
function ProfileForm({ profile, markOnboarded = false, submitLabel = "Save" }) {
	const qc = useQueryClient();
	const navigate = useNavigate();
	const [avatarUrl, setAvatarUrl] = (0, import_react.useState)(profile.avatar_url);
	const [cardColor, setCardColor] = (0, import_react.useState)(profile.card_color || "default");
	const [cardStyle, setCardStyle] = (0, import_react.useState)(profile.card_style || "soft");
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
		resolver: u(profileSchema),
		defaultValues: {
			firstName: profile.first_name ?? "",
			lastName: profile.last_name ?? "",
			tagline: profile.tagline ?? "",
			occupation: profile.occupation ?? "",
			location: profile.location ?? "",
			bio: profile.bio ?? "",
			passions: profile.passions.join(", "),
			hobbies: profile.hobbies.join(", "),
			website: profile.website ?? "",
			twitter: profile.twitter ?? "",
			github: profile.github ?? "",
			linkedin: profile.linkedin ?? ""
		}
	});
	const watchFirstName = watch("firstName");
	const watchLastName = watch("lastName");
	const parseTags = (s) => (s || "").split(",").map((t) => t.trim()).filter(Boolean);
	const save = useMutation({
		mutationFn: async (data) => {
			return updateMyProfile({
				first_name: data.firstName.trim() || null,
				last_name: data.lastName.trim() || null,
				tagline: data.tagline?.trim() || null,
				occupation: data.occupation?.trim() || null,
				location: data.location?.trim() || null,
				bio: data.bio?.trim() || null,
				passions: parseTags(data.passions),
				hobbies: parseTags(data.hobbies),
				website: data.website?.trim() || null,
				twitter: data.twitter?.trim() || null,
				github: data.github?.trim() || null,
				linkedin: data.linkedin?.trim() || null,
				avatar_url: avatarUrl,
				card_color: cardColor,
				card_style: cardStyle,
				...markOnboarded ? { onboarded: true } : {}
			});
		},
		onSuccess: (updated) => {
			qc.invalidateQueries({ queryKey: ["me"] });
			qc.invalidateQueries({ queryKey: ["profiles"] });
			qc.invalidateQueries({ queryKey: ["profile", updated.id] });
			toast.success("Profile saved");
			if (markOnboarded) navigate({
				to: "/members/$id",
				params: { id: updated.id }
			});
		},
		onError: (e) => toast.error(e.message)
	});
	const onSubmit = (data) => save.mutate(data);
	const onFile = async (file) => {
		if (file.size > 5 * 1024 * 1024) return toast.error("Max 5MB");
		setUploading(true);
		try {
			const path = await uploadAvatar(file);
			setAvatarUrl(path);
			toast.success("Photo uploaded");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Upload failed");
		} finally {
			setUploading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit(onSubmit),
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberAvatar, {
					profile: {
						avatar_url: avatarUrl,
						first_name: watchFirstName,
						last_name: watchLastName
					},
					size: "xl"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-hairline bg-surface px-4 text-sm hover:bg-surface-2 sm:h-auto sm:w-auto sm:py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Upload, { className: "h-4 w-4" }),
						uploading ? "Uploading…" : avatarUrl ? "Change photo" : "Upload photo",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/*",
							className: "hidden",
							onChange: (e) => {
								const f = e.target.files?.[0];
								if (f) onFile(f);
							}
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Basics",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "First name",
							error: errors.firstName?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								...register("firstName"),
								className: "h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Last name",
							error: errors.lastName?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								...register("lastName"),
								className: "h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Tagline",
						hint: "One sentence about you.",
						error: errors.tagline?.message,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							...register("tagline"),
							placeholder: "Designing calm tools for restless teams.",
							className: "h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Occupation",
							error: errors.occupation?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								...register("occupation"),
								placeholder: "Product designer",
								className: "h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Location",
							error: errors.location?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								...register("location"),
								placeholder: "Lagos, Nigeria",
								className: "h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Bio",
						hint: "A short paragraph. Markdown-free.",
						error: errors.bio?.message,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							...register("bio"),
							rows: 4,
							className: "w-full rounded-md border border-hairline bg-surface p-3 text-sm outline-none focus:border-primary/60"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Passions & hobbies",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Passions",
					hint: "Comma-separated. Things you deeply care about.",
					error: errors.passions?.message,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						...register("passions"),
						placeholder: "climate, open source, education",
						className: "h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Hobbies",
					hint: "Comma-separated. What you do off the clock.",
					error: errors.hobbies?.message,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						...register("hobbies"),
						placeholder: "climbing, film photography, chess",
						className: "h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Elsewhere",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Website",
					error: errors.website?.message,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						...register("website"),
						placeholder: "https://…",
						className: "h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Twitter / X",
							error: errors.twitter?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								...register("twitter"),
								placeholder: "https://x.com/…",
								className: "h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "GitHub",
							error: errors.github?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								...register("github"),
								placeholder: "https://github.com/…",
								className: "h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "LinkedIn",
							error: errors.linkedin?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								...register("linkedin"),
								placeholder: "https://linkedin.com/in/…",
								className: "h-12 w-full rounded-md border border-hairline bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary/60"
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Card appearance",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardStylePicker, {
					color: cardColor,
					onChangeColor: setCardColor,
					style: cardStyle,
					onChangeStyle: setCardStyle,
					profile: {
						...profile,
						first_name: watchFirstName,
						last_name: watchLastName,
						occupation: watch("occupation") ?? null,
						location: watch("location") ?? null,
						tagline: watch("tagline") ?? null,
						passions: parseTags(watch("passions")),
						hobbies: parseTags(watch("hobbies")),
						avatar_url: avatarUrl
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hairline-t flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: isSubmitting || save.isPending,
					className: "h-12 w-full rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60 sm:h-auto sm:w-auto sm:py-2.5",
					children: isSubmitting || save.isPending ? "Saving…" : submitLabel
				})
			})
		]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", {
			className: "font-mono text-[11px] uppercase tracking-widest text-primary",
			children: ["/ ", title]
		}), children]
	});
}
function Field({ label, hint, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block relative pb-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1.5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium",
					children: label
				}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: hint
				})]
			}),
			children,
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute bottom-0 left-0 text-xs text-red-500/90 font-medium",
				children: error
			})
		]
	});
}
//#endregion
export { ProfileForm as t };
