// app/(private)/account/profile/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, User, Mail, Phone, CheckCircle } from "lucide-react";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";

const MOCK_USER = {
    fullName: "Alexander Wright",
    email: "alexander@example.com",
    phone: "+1 (555) 234-8901",
};

export default function ProfilePage() {
    const [fullName, setFullName] = useState(MOCK_USER.fullName);
    const [email, setEmail] = useState(MOCK_USER.email);
    const [phone, setPhone] = useState(MOCK_USER.phone);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordSaved, setPasswordSaved] = useState(false);

    async function handleProfileSave(e: React.FormEvent) {
        e.preventDefault();
        setIsSaving(true);
        await new Promise((res) => setTimeout(res, 900));
        setIsSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    }

    async function handlePasswordChange(e: React.FormEvent) {
        e.preventDefault();
        setIsChangingPassword(true);
        await new Promise((res) => setTimeout(res, 900));
        setIsChangingPassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setPasswordSaved(true);
        setTimeout(() => setPasswordSaved(false), 3000);
    }

    return (
        <main className="max-w-2xl mx-auto px-4 md:px-6 py-10 md:py-14">
            <Link href="/account" className="inline-flex items-center gap-1.5 font-body text-sm text-navy/50 hover:text-navy transition-colors mb-8">
                <ArrowLeft size={15} /> Back to Account
            </Link>

            <h1 className="font-heading text-2xl md:text-3xl text-navy mb-8">Profile</h1>

            {/* Personal info */}
            <section className="bg-ivory border border-navy/8 rounded-3xl p-6 md:p-8 mb-6">
                <h2 className="font-heading text-base text-navy mb-6">Personal information</h2>

                <form onSubmit={handleProfileSave} noValidate className="space-y-5">
                    <TextField
                        id="profile-fullname"
                        label="Full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        autoComplete="off"
                        icon={<User size={15} />}
                        required
                    />
                    <TextField
                        id="profile-email"
                        label="Email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                        icon={<Mail size={15} />}
                        required
                    />
                    <TextField
                        id="profile-phone"
                        label="Phone number"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="off"
                        icon={<Phone size={15} />}
                    />

                    <div className="flex items-center gap-3 pt-1">
                        <Button
                            type="submit"
                            variant="primary"
                            size="sm"
                            isLoading={isSaving}
                            icon={<ArrowRight size={15} />}
                        >
                            Save changes
                        </Button>
                        {saved && (
                            <span className="flex items-center gap-1.5 font-body text-sm text-emerald-600">
                                <CheckCircle size={15} /> Saved!
                            </span>
                        )}
                    </div>
                </form>
            </section>

            {/* Change password */}
            <section className="bg-ivory border border-navy/8 rounded-3xl p-6 md:p-8">
                <h2 className="font-heading text-base text-navy mb-6">Change password</h2>

                <form onSubmit={handlePasswordChange} noValidate className="space-y-5">
                    <TextField
                        id="profile-current-password"
                        label="Current password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        required
                    />
                    <TextField
                        id="profile-new-password"
                        label="New password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        required
                    />

                    <div className="flex items-center gap-3 pt-1">
                        <Button
                            type="submit"
                            variant="outline"
                            size="sm"
                            isLoading={isChangingPassword}
                        >
                            Update password
                        </Button>
                        {passwordSaved && (
                            <span className="flex items-center gap-1.5 font-body text-sm text-emerald-600">
                                <CheckCircle size={15} /> Updated!
                            </span>
                        )}
                    </div>
                </form>
            </section>
        </main>
    );
}
