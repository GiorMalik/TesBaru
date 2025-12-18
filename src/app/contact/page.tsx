import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram, Mail, Phone } from "lucide-react";
import Link from "next/link";

const contactDetails = [
    {
        icon: Mail,
        title: "Email",
        value: "giorginomalik@gmail.com",
        href: "mailto:giorginomalik@gmail.com"
    },
    {
        icon: Phone,
        title: "WhatsApp",
        value: "+62 858-5496-5523",
        href: "https://wa.me/6285854965523"
    },
    {
        icon: Instagram,
        title: "Instagram",
        value: "@gior.malik",
        href: "https://www.instagram.com/gior.malik"
    }
];

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    Hubungi Kami
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                    Punya pertanyaan atau ingin booking? Jangan ragu untuk menghubungi kami melalui salah satu channel di bawah ini.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {contactDetails.map((item) => (
                    <Card key={item.title} className="bg-gray-800/50 border-green-500/20 text-center hover:shadow-neon-green/30 transition-shadow duration-300">
                        <CardHeader>
                            <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                            <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Link href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary break-all">
                                {item.value}
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
