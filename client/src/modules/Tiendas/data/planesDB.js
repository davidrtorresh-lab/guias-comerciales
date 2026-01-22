export const planesDB = [
    // --- HOGAR: FULL TIGO ---
    { 
        id: "h_ft_duo", 
        vertical: "HOGAR", 
        category: "FULL TIGO", 
        megas: "DÚO", 
        manualUnit: "500 MB", 
        desc: "BA + MÓVIL", 
        tech: "HFC/GPON", 
        estrato: "1-6", 
        headerClass: "bg-gradient-to-br from-[#00377B] to-[#004a99] text-white", 
        variations: [
            { 
                label: "FULL TIGO", 
                price: "$54.950", 
                regular: "Mes 2+: $109.900", 
                promoText: "PAGAS 50% MES 1",
                features: ["<b>Internet 500 Megas</b> + Instalación", "<b>Móvil Ilimitado</b> (Voz y Datos)", "App HBO Max (12 Meses)", "Costos de Instalación Incluidos"], 
                favHFC: "PLAN FULL TIGO DUO HFC E1-6", 
                idHFC: "E1-3 757 / E4-6 7571", 
                favGPON: "PLAN FULL TIGO DUO GPON E1-6", 
                idGPON: "E1-3 757 / E4-6 7571" 
            }, 
            { 
                label: "+ EQUIPO HONOR", 
                price: "$69.950", 
                regular: "Mes 2+: $139.900", 
                promoText: "PAGAS 50% MES 1",
                features: ["📱 <b>Celular HONOR Incluido</b>", "<b>Internet 500 Megas</b>", "<b>Móvil Ilimitado</b> (Voz y Datos)", "App HBO Max (12 Meses)"], 
                favHFC: "PLAN FULL TIGO DUO HFC E1-6", 
                idHFC: "E1-3 757 / E4-6 7571", 
                favGPON: "PLAN FULL TIGO DUO GPON E1-6", 
                idGPON: "E1-3 757 / E4-6 7571" 
            }
        ] 
    },
    { 
        id: "h_ft_trio", 
        vertical: "HOGAR", 
        category: "FULL TIGO", 
        megas: "TRÍO", 
        manualUnit: "500 MB", 
        desc: "TV + BA + MÓVIL", 
        tech: "HFC/GPON", 
        estrato: "1-6", 
        headerClass: "bg-gradient-to-br from-[#00377B] to-[#004a99] text-white", 
        variations: [
            { 
                label: "FULL TIGO", 
                price: "$69.950", 
                regular: "Mes 2+: $139.900", 
                promoText: "50% MES 1",
                features: ["<b>Internet 500 Megas</b>", "<b>TV Avanzada</b> (2 Decos Android/HD)", "⚽ <b>WIN+ Fútbol (12 Meses)</b>", "Móvil Ilimitado + HBO Max (12 Meses)"], 
                favHFC: "PLAN FULL TIGO TRIO HFC E1-6", 
                idHFC: "E1-3 760 / E4-6 7601", 
                favGPON: "PLAN FULL TIGO TRIO GPON E1-6", // Nota: En tu HTML original GPON tenía un array de objetos, aquí lo simplifiqué a string para evitar errores, valida si necesitas el desglose.
                idGPON: "E1-3 760 / E4-6 7601" 
            }, 
            { 
                label: "+ EQUIPO HONOR", 
                price: "$84.950", 
                regular: "Mes 2+: $169.900", 
                promoText: "50% MES 1",
                features: ["📱 <b>Celular HONOR Incluido</b>", "<b>Internet 500 Megas</b> + TV Avanzada", "⚽ <b>WIN+ Fútbol (12 Meses)</b>", "Móvil Ilimitado + HBO Max (12 Meses)"], 
                favHFC: "PLAN FULL TIGO TRIO HFC E1-6", 
                idHFC: "E1-3 760 / E4-6 7601", 
                favGPON: "PLAN FULL TIGO TRIO GPON E1-6",
                idGPON: "E1-3 760 / E4-6 7601" 
            }
        ] 
    },
    // --- HOGAR: MORADOS (NUEVO) ---
    { 
        id: "h_ft_morado_duo", 
        vertical: "HOGAR", 
        category: "FULL TIGO", 
        megas: "DÚO", 
        manualUnit: "500 MB", 
        desc: "BA + MÓVIL", 
        tech: "HFC/GPON", 
        estrato: "1-6", 
        headerClass: "bg-gradient-to-br from-[#7B1FA2] to-[#4A148C] text-white", // Morado
        variations: [
            { 
                label: "PORTA MORADO", 
                price: "$54.950", 
                regular: "Mes 2-12: $85.900", 
                promoText: "PAGAS 50% MES 1", 
                features: ["<b>¡EXCLUSIVO PORTA MORADO!</b>", "Mes 1: 50% Dto", "Mes 2-12: Precio Especial $85.900", "Ahorra $24.000 Mensual"], 
                favHFC: "PLAN FULL TIGO DUO HFC E1-6", 
                idHFC: "E1-3 757 / E4-6 7571", 
                favGPON: "PLAN FULL TIGO DUO GPON E1-6", 
                idGPON: "E1-3 757 / E4-6 7571" 
            }
        ] 
    },
    { 
        id: "h_ft_morado_trio", 
        vertical: "HOGAR", 
        category: "FULL TIGO", 
        megas: "TRÍO", 
        manualUnit: "500 MB", 
        desc: "TV + BA + MÓVIL", 
        tech: "HFC/GPON", 
        estrato: "1-6", 
        headerClass: "bg-gradient-to-br from-[#7B1FA2] to-[#4A148C] text-white", // Morado
        variations: [
            { 
                label: "PORTA MORADO", 
                price: "$69.950", 
                regular: "Mes 2-12: $109.900", 
                promoText: "PAGAS 50% MES 1", 
                features: ["<b>¡EXCLUSIVO PORTA MORADO!</b>", "Mes 1: 50% Dto", "Mes 2-12: Precio Especial $109.900", "TV Avanzada", "Ahorra $30.000 Mensual"], 
                favHFC: "PLAN FULL TIGO TRIO HFC E1-6", 
                idHFC: "E1-3 760 / E4-6 7601", 
                favGPON: "PLAN FULL TIGO TRIO GPON E1-6", 
                idGPON: "E1-3 760 / E4-6 7601" 
            }
        ] 
    },
    // --- HOGAR: TÁCTICOS WIN+ ---
    { 
        id: "h_tac_win_200", 
        vertical: "HOGAR", 
        category: "TACTICO", 
        megas: "DÚO", 
        manualUnit: "200 MB", 
        desc: "BA + TV + WIN+", 
        tech: "HFC/GPON", 
        estrato: "1-6", 
        headerClass: "bg-gradient-to-br from-[#FFC800] to-[#ffdb4d] text-blue-900", 
        variations: [
            { 
                label: "ESTRATO 1-3", 
                price: "$75.180", 
                regular: "Mes 3+: $97.671", 
                promoText: "50% DTO MES 1 Y 2", 
                features: ["<b>Win+ Fútbol Incluido</b>", "1 Deco Android", "Internet 200 Megas", "DTO 100% PPC"], 
                favHFC: "HFC NBOW TV Espe 1D + 200MB + 100PPC E2-6", 
                idHFC: "N/A",
                favGPON: "GPON NBOW TV Espe 1D + 200MB + 100PPC E2-3",
                idGPON: "N/A"
            }, 
            { 
                label: "ESTRATO 4-6", 
                price: "$82.665", 
                regular: "Mes 3+: $108.151", 
                promoText: "50% DTO MES 1 Y 2", 
                features: ["<b>Win+ Fútbol Incluido</b>", "1 Deco Android", "Internet 200 Megas", "DTO 100% PPC"], 
                favHFC: "HFC NBOW TV Espe 1D + 200MB + 100PPC E2-6", 
                idHFC: "N/A",
                favGPON: "GPON NBOW TV Espe 1D + 200MB + 100PPC E4-6",
                idGPON: "N/A"
            }
        ] 
    },
    { 
        id: "h_tac_win_500", 
        vertical: "HOGAR", 
        category: "TACTICO", 
        megas: "DÚO", 
        manualUnit: "500 MB", 
        desc: "TV AVAN + BA + WIN+", 
        tech: "HFC/GPON", 
        estrato: "1-6", 
        headerClass: "bg-gradient-to-br from-[#FFC800] to-[#ffdb4d] text-blue-900", 
        variations: [
            { 
                label: "ESTRATO 1-3", 
                price: "$80.440", 
                regular: "Mes 3+: $111.184", 
                promoText: "50% DTO MES 1 Y 2", 
                features: ["<b>Win+ Fútbol Incluido</b>", "2 Decos Android (GPON)", "Internet 500 Megas", "DTO 100% PPC"], 
                favHFC: "HFC NBOW TV Avanza 2D + 500MB + 100PPC E2-6", 
                idHFC: "N/A",
                favGPON: "GPON NBOW TV Avanza 2D + 500MB + 100PPC E2-3",
                idGPON: "N/A"
            }, 
            { 
                label: "ESTRATO 4-6", 
                price: "$87.825", 
                regular: "Mes 3+: $122.263", 
                promoText: "50% DTO MES 1 Y 2", 
                features: ["<b>Win+ Fútbol Incluido</b>", "2 Decos Android (GPON)", "Internet 500 Megas", "DTO 100% PPC"], 
                favHFC: "HFC NBOW TV Avanza 2D + 500MB + 100PPC E2-6", 
                idHFC: "N/A",
                favGPON: "GPON NBOW TV Avanza 2D + 500MB + 100PPC E4-6",
                idGPON: "N/A"
            }
        ] 
    },
    // --- HOGAR: TÁCTICOS ESTÁNDAR ---
    { 
        id: "h_tac_200", 
        vertical: "HOGAR", 
        category: "TACTICO", 
        megas: "DÚO", 
        manualUnit: "200 MB", 
        desc: "BA + TV", 
        tech: "HFC/GPON", 
        estrato: "1-2", 
        headerClass: "bg-gradient-to-br from-[#FFC800] to-[#ffdb4d] text-blue-900", 
        variations: [
            { 
                label: "1 DECO", 
                price: "$42.450", 
                regular: "Mes 3+: $76.410", 
                promoText: "PRECIO MES 1 Y 2", 
                features: ["Precio Especial", "DTO 100% PPC", "Oferta Táctica NBO"],
                favHFC: "HFC NBO TV Espe 1D + 200MB + 100PPC E2-6", 
                idHFC: "N/A",
                favGPON: "GPON NBO TV Espe 1D + 200MB + 100PPC E2-3",
                idGPON: "N/A"
            }, 
            { 
                label: "2 DECOS", 
                price: "$50.450", 
                regular: "Mes 3+: $80.165", 
                promoText: "PRECIO MES 1 Y 2", 
                features: ["Incluye 2 Decos", "DTO 100% PPC", "Oferta Táctica NBO"],
                favHFC: "HFC NBO TV Espe 2D + 200MB + 100PPC E2-6", 
                idHFC: "N/A",
                favGPON: "GPON NBO TV Espe 2D + 200MB + 100PPC E2-3",
                idGPON: "N/A"
            }
        ] 
    },
    { 
        id: "h_tac_500", 
        vertical: "HOGAR", 
        category: "TACTICO", 
        megas: "DÚO", 
        manualUnit: "500 MB", 
        desc: "TV AVAN + BA", 
        tech: "HFC/GPON", 
        estrato: "1-2", 
        headerClass: "bg-gradient-to-br from-[#FFC800] to-[#ffdb4d] text-blue-900", 
        variations: [
            { 
                label: "ESTÁNDAR", 
                price: "$54.950", 
                regular: "Mes 3+: $93.415", 
                promoText: "PRECIO MES 1 Y 2", 
                features: ["<b>Incluye 2 Decos</b>", "TV Avanzada", "DTO 100% PPC"], 
                favHFC: "HFC NBO TV Avanza 2D + 500MB + 100PPC E2-6", 
                idHFC: "N/A",
                favGPON: "GPON NBO TV Avanza 2D + 500MB + 100PPC E2-3",
                idGPON: "N/A"
            }
        ] 
    },
    { 
        id: "h_tac_ind_500", 
        vertical: "HOGAR", 
        category: "TACTICO", 
        megas: "IND", 
        manualUnit: "500 MB", 
        desc: "SOLO BA", 
        tech: "GPON", 
        estrato: "1-3", 
        headerClass: "bg-gradient-to-br from-[#FFC800] to-[#ffdb4d] text-blue-900", 
        variations: [
            { 
                label: "SOLO INTERNET", 
                price: "$37.950", 
                regular: "Mes 3+: $68.310", 
                promoText: "PRECIO MES 1 Y 2", 
                features: ["Alta Velocidad", "50% Dto x 2 Meses", "Mejor velocidad de subida"], 
                favHFC: "HFC NBO 1P Inter 500MB + 100PPC E2-6", 
                idHFC: "N/A",
                favGPON: "GPON NBO 1P Inter 500MB + 100PPC E2-6",
                idGPON: "N/A"
            }
        ] 
    },
    { 
        id: "h_tac_ind_200", 
        vertical: "HOGAR", 
        category: "TACTICO", 
        megas: "IND", 
        manualUnit: "200 MB", 
        desc: "SOLO BA", 
        tech: "HFC/GPON", 
        estrato: "1-3", 
        headerClass: "bg-gradient-to-br from-[#FFC800] to-[#ffdb4d] text-blue-900", 
        variations: [
            { 
                label: "SOLO INTERNET", 
                price: "$30.450", 
                regular: "Mes 3+: $60.900", 
                promoText: "PRECIO MES 1 Y 2", 
                features: ["Internet Básico", "50% Dto x 2 Meses", "DTO 100% PPC"], 
                favHFC: "HFC NBO 1P Internet 200MB + 100PPC E2-6", 
                idHFC: "N/A",
                favGPON: "GPON NBO 1P Internet 200MB + 100PPC E2-6",
                idGPON: "N/A"
            }
        ] 
    },
    { 
        id: "h_tac_trio", 
        vertical: "HOGAR", 
        category: "TACTICO", 
        megas: "TRÍO", 
        manualUnit: "500 MB", 
        desc: "TV AVAN + 500 + TO", 
        tech: "HFC/GPON", 
        estrato: "1-2", 
        headerClass: "bg-gradient-to-br from-[#FFC800] to-[#ffdb4d] text-blue-900", 
        variations: [
            { 
                label: "TRÍO", 
                price: "$57.450", 
                regular: "Mes 3+: $103.410", 
                promoText: "PRECIO MES 1 Y 2", 
                features: ["<b>Incluye 2 Decos</b>", "Telefonía Fija", "TV Avanzada HD"], 
                favHFC: "HFC NBO TV Avanza 2D + 500MB + TO + 100PPC E2-6", 
                idHFC: "N/A",
                favGPON: "GPON NBO TV Avanza 2D + 500MB + TO + 100PPC E2-3",
                idGPON: "N/A"
            }
        ] 
    },
    // --- HOGAR: NACIONAL ---
    { 
        id: "h_nac_500", 
        vertical: "HOGAR", 
        category: "NACIONAL", 
        megas: "DÚO", 
        manualUnit: "500 MB", 
        desc: "TV AVAN + BA", 
        tech: "Nacional", 
        estrato: "1-6", 
        headerClass: "bg-gradient-to-br from-[#00C8FF] to-[#0093be] text-white", 
        variations: [
            { 
                label: "SIN WIN+", 
                price: "$98.910", 
                regular: "E4-6: $111.889", 
                promoText: "TV AVANZADA + 2 DECOS", 
                features: ["TV Avanzada", "2 Decos Incluidos", "Internet 500 Megas"], 
                favHFC: "HFC NC TV Avanzada 2D + 500MB + 50PPC E2-6", 
                idHFC: "N/A", 
                favGPON: "GPON NC TV Avanzada 2D + 500MB + 50PPC E2-3", 
                idGPON: "N/A" 
            }, 
            { 
                label: "CON WIN+", 
                price: "$117.860", 
                regular: "E4-6: $130.839", 
                promoText: "TV AVANZADA + 2 DECOS", 
                features: ["<b>Win+ Fútbol Incluido</b>", "TV Avanzada", "2 Decos Incluidos"], 
                favHFC: "HFC NC TV Avanzada 2D + 500MB + 50PPC E2-6", 
                idHFC: "N/A", 
                favGPON: "GPON NC TV Avanzada 2D + 500MB + 50PPC E2-3", 
                idGPON: "N/A" 
            }
        ] 
    },
    { 
        id: "h_nac_200", 
        vertical: "HOGAR", 
        category: "NACIONAL", 
        megas: "DÚO", 
        manualUnit: "200 MB", 
        desc: "TV ESPECIAL + BA", 
        tech: "Nacional", 
        estrato: "1-6", 
        headerClass: "bg-white border-b border-gray-200 text-blue-900", // Estilo White
        variations: [
            { 
                label: "SIN WIN+", 
                price: "$84.900", 
                regular: "E4-6: $96.471", 
                promoText: "TV ESPECIAL + 1 DECO", 
                features: ["TV Especial", "1 Deco Incluido", "Internet 200 Megas"], 
                favHFC: "HFC NC TV Espe 1D + 200MB + 50PPC E1-6", 
                idHFC: "N/A", 
                favGPON: "GPON NC TV Espe 1D + 200MB + 50PPC E1-3", 
                idGPON: "N/A" 
            }, 
            { 
                label: "CON WIN+", 
                price: "$103.850", 
                regular: "E4-6: $115.421", 
                promoText: "TV ESPECIAL + 1 DECO", 
                features: ["<b>Win+ Fútbol Incluido</b>", "TV Especial", "1 Deco Incluido"], 
                favHFC: "HFC NC TV Espe 1D + 200MB + 50PPC E1-6", 
                idHFC: "N/A", 
                favGPON: "GPON NC TV Espe 1D + 200MB + 50PPC E1-3", 
                idGPON: "N/A" 
            }
        ] 
    },
    { 
        id: "h_nac_ba", 
        vertical: "HOGAR", 
        category: "NACIONAL", 
        megas: "IND", 
        manualUnit: "500 MB", 
        desc: "SOLO BA", 
        tech: "Nacional", 
        estrato: "1-6", 
        headerClass: "bg-gradient-to-br from-[#00C8FF] to-[#0093be] text-white", 
        variations: [
            { 
                label: "ESTRATO 1-3", 
                price: "$37.950", 
                regular: "Mes 3+: $75.900", 
                promoText: "FACTURA 1 Y 2", 
                features: ["Internet 500 Megas", "Descuento Factura 1 y 2", "Solo Internet"], 
                favHFC: "HFC NC 1P Inter 500MB + 50PPC E1-6", 
                idHFC: "N/A", 
                favGPON: "GPON NC 1P Inter 500MB + 50PPC E1-6", 
                idGPON: "N/A" 
            }, 
            { 
                label: "ESTRATO 4-6", 
                price: "$45.161", 
                regular: "Mes 3+: $90.321", 
                promoText: "FACTURA 1 Y 2", 
                features: ["Internet 500 Megas", "Descuento Factura 1 y 2", "Solo Internet"], 
                favHFC: "HFC NC 1P Inter 500MB + 50PPC E1-6", 
                idHFC: "N/A", 
                favGPON: "GPON NC 1P Inter 500MB + 50PPC E1-6", 
                idGPON: "N/A" 
            }
        ] 
    },
    // --- MÓVIL: POSPAGO ---
    { 
        id: "m_60", 
        vertical: "MOVIL", 
        category: "POSPAGO", 
        megas: "60", 
        desc: "DATOS MÓVILES", 
        tech: "4G/5G", 
        estrato: null, 
        headerClass: "bg-gradient-to-br from-[#00377B] to-[#004a99] text-white", 
        variations: [
            { 
                label: "PORTA", 
                price: "$24.950", 
                regular: "Mes 4: $49.900", 
                promoText: "50% DTO MESES 1, 2 Y 3", 
                features: ["60GB Navegación", "Comparte 15GB", "Minutos Ilimitados"], 
                favMovil: "ID: 7561\nPospago Fidelizacion 5.0 Plus+ Seg FC" 
            }, 
            { 
                label: "MIGRA", 
                price: "$34.930", 
                regular: "Mes 4: $49.900", 
                promoText: "30% DTO MESES 1, 2 Y 3", 
                features: ["60GB Navegación", "Comparte 15GB", "Minutos Ilimitados"], 
                favMovil: "ID: 768 - 7681\nPospago 5.0 M FC" 
            }
        ] 
    },
    { 
        id: "m_40", 
        vertical: "MOVIL", 
        category: "POSPAGO", 
        megas: "40", 
        desc: "DATOS MÓVILES", 
        tech: "4G/5G", 
        estrato: null, 
        headerClass: "bg-gradient-to-br from-[#00377B] to-[#004a99] text-white", 
        variations: [
            { 
                label: "MIGRACIÓN", 
                price: "$30.730", 
                regular: "Mes 4: $43.900", 
                promoText: "30% DTO MES 1-3", 
                features: ["40GB Navegación", "Comparte 15GB", "Ideal para Migración"], 
                favMovil: "ID: 754 - 7541\nPospago 5.0 S FC" 
            }
        ] 
    },
    { 
        id: "m_l", 
        vertical: "MOVIL", 
        category: "POSPAGO", 
        megas: "ILIMITADO", 
        desc: "DATOS INFINITOS", 
        tech: "4G/5G", 
        estrato: null, 
        headerClass: "bg-gradient-to-br from-[#00377B] to-[#004a99] text-white", 
        variations: [
            { 
                label: "PORTABILIDAD", 
                price: "$34.950", 
                regular: "Mes 4: $69.900", 
                promoText: "50% DTO MES 1-3", 
                features: ["Datos Ilimitados", "Comparte 15GB", "Solo Portabilidad"], 
                favMovil: "ID: 772 / 7721\nPospago 5.0 L FC" 
            }
        ] 
    },
    { 
        id: "m_eq", 
        vertical: "MOVIL", 
        category: "POSPAGO", 
        megas: "FULL EQUIPO", 
        desc: "HONOR + POSPAGO", 
        tech: "4G/5G", 
        estrato: null, 
        headerClass: "bg-gradient-to-br from-[#00377B] to-[#004a99] text-white", 
        variations: [
            { 
                label: "PORTA Y MIGRA", 
                price: "$79.900", 
                regular: "Tarifa Plena", 
                promoText: "INCLUYE CELULAR", 
                features: ["Datos Ilimitados (25GB comp)", "Equipo Honor Incluido", "Porta y Migra"], 
                favMovil: "ID: 770\nFull Equipo Pospago 5.2_V2" 
            }
        ] 
    },
    { 
        id: "m_xl", 
        vertical: "MOVIL", 
        category: "POSPAGO", 
        megas: "ILIMITADO", 
        desc: "IPHONE PROMO", 
        tech: "4G/5G", 
        estrato: null, 
        headerClass: "bg-gradient-to-br from-[#FFC800] to-[#ffdb4d] text-blue-900", 
        variations: [
            { 
                label: "IPHONE 16", 
                price: "$54.950", 
                regular: "Mes 7: $109.900", 
                promoText: "50% DTO MES 1-6", 
                features: ["Por compra iPhone 16", "Datos Ilimitados (15GB comp)", "Tiendas Seleccionadas"], 
                favMovil: "ID: 774 / 7741\nPospago 5.0 XL FC" 
            }
        ] 
    },
    // --- MÓVIL: TÁCTICOS ---
    { 
        id: "mt_fideliza", 
        vertical: "MOVIL", 
        category: "MOVIL_TACTICO", 
        megas: "60", 
        desc: "FIDELIZACIÓN", 
        tech: "4G/5G", 
        estrato: null, 
        headerClass: "bg-gradient-to-br from-[#FFC800] to-[#ffdb4d] text-blue-900", 
        variations: [
            { 
                label: "PORTABILIDAD", 
                price: "$0", 
                regular: "Mes 2-3: $24.950 | Mes 4+: $49.900", 
                promoText: "MES 1 GRATIS", 
                features: ["1er Mes Gratis", "Mes 2 y 3: 50% Dto", "Solo Portabilidad", "<span style='color:#d32f2f; font-weight:900;'>⚠ Vigencia: 5 Dic</span>"], 
                favMovil: "ID: 7561\nPospago Fidelizacion 5.0 Plus+ Seg FC" 
            }
        ] 
    },
    { 
        id: "mt_migra", 
        vertical: "MOVIL", 
        category: "MOVIL_TACTICO", 
        megas: "40", 
        desc: "MIGRACIÓN", 
        tech: "4G/5G", 
        estrato: null, 
        headerClass: "bg-gradient-to-br from-[#FFC800] to-[#ffdb4d] text-blue-900", 
        variations: [
            { 
                label: "MIGRACIÓN", 
                price: "$30.730", 
                regular: "Mes 4: $43.900", 
                promoText: "30% DTO MES 1-3", 
                features: ["40GB Navegación", "Comparte 15GB", "Solo Migración", "<span style='color:#d32f2f; font-weight:bold;'>Free Inhabilitado</span>"], 
                favMovil: "ID: 7541 - 754" 
            }
        ] 
    },
    { 
        id: "mt_porta_migra", 
        vertical: "MOVIL", 
        category: "MOVIL_TACTICO", 
        megas: "60", 
        desc: "PORTA / MIGRA", 
        tech: "4G/5G", 
        estrato: null, 
        headerClass: "bg-gradient-to-br from-[#FFC800] to-[#ffdb4d] text-blue-900", 
        variations: [
            { 
                label: "PORTA / MIGRA", 
                price: "$34.930", 
                regular: "Mes 4: $49.900", 
                promoText: "30% DTO MES 1-3", 
                features: ["60GB Navegación", "Comparte 15GB", "Porta y Migra", "<span style='color:#d32f2f; font-weight:bold;'>Free Inhabilitado</span>"], 
                favMovil: "ID: 7681 - 768" 
            }
        ] 
    },
    { 
        id: "mt_2linea", 
        vertical: "MOVIL", 
        category: "MOVIL_TACTICO", 
        megas: "ILIMITADO", 
        desc: "2DA LÍNEA", 
        tech: "4G/5G", 
        estrato: null, 
        headerClass: "bg-gradient-to-br from-[#FFC800] to-[#ffdb4d] text-blue-900", 
        variations: [
            { 
                label: "SOLO CLIENTES FULL", 
                price: "$0", 
                regular: "Mes 2: $32.900", 
                promoText: "MES 1 GRATIS", 
                features: ["1er Mes Gratis", "1er Año: $32.900", "Solo Clientes Full", "Hasta Nueva Orden"], 
                favMovil: "ID: 7501\nPortabilidad Clientes Full 2da línea" 
            }
        ] 
    }
];