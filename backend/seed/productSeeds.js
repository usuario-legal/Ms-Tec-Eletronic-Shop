const Product = require('../models/product');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

const productSeeds = [

  // ============================================
  // CELULARES (SMARTPHONES)
  // ============================================

  {
    name: 'iPhone 15 Pro Max',
    description: `iPhone 15 Pro Max

DESCRICAO PROFISSIONAL:
O iPhone 15 Pro Max e o smartphone mais avancado jamais criado pela Apple. Construido em titanio aeroespacial de grau medico, e extremamente resistente e surpreendentemente leve — uma verdadeira revolucao no design premium.

Equipado com o chip A17 Pro fabricado em processo de 3 nanometros (o primeiro do mundo), este dispositivo oferece desempenho digno de computadores profissionais. A nova GPU com 6 nucleos suporta hardware-accelerated ray tracing, transformando a experiencia em jogos mobile num patamar nunca antes visto.

A camara principal de 48MP com zoom optico de 5x permite capturar momentos com detalhes impressionantes, mesmo em condicoes de pouca luz. A nova porta USB-C oferece velocidades de transferencia ate 20x mais rapidas.

Ideal para: Profissionais criativos, gamers exigentes, fotografos, criadores de conteudo digital e qualquer pessoa que exija o melhor do mercado.

ESPECIFICACOES TECNICAS:
Tela: 6.7" Super Retina XDR OLED, 120Hz ProMotion
Processador: Apple A17 Pro (3nm)
RAM: 8GB
Armazenamento: 256GB NVMe
Camara: 48MP + 12MP + 12MP (Zoom optico 5x)
Camara Frontal: 12MP
Bateria: 4441 mAh (ate 29h video)
Carregamento: USB-C 20W, MagSafe
Resistencia: IP68
Conectividade: 5G, Wi-Fi 6E, Bluetooth 5.3
Seguranca: Face ID
Peso: 221g

DESTAQUES:
Construcao em titanio aeroespacial
Chip A17 Pro (3nm) com ray tracing
Camara 48MP com zoom optico 5x
USB-C de alta velocidade
Ecra 120Hz ProMotion

PRECO (MZN): 75.000 MZN`,
    price: 75000,
    category: 'celulares',
    image: 'https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg',
    brand: 'Apple',
    stock: 100
  },

  {
    name: 'Redmi Note 15 Pro+ 5G',
    description: `Redmi Note 15 Pro+ 5G

DESCRICAO PROFISSIONAL:
O Redmi Note 15 Pro+ 5G foi desenvolvido para utilizadores que procuram velocidade, potencia e fotografia profissional num unico dispositivo. Equipado com um enorme ecra AMOLED de 120Hz, este smartphone oferece cores vibrantes, pretos profundos e uma experiencia ultra fluida para jogos, videos e redes sociais.

A poderosa camera principal de 200MP com estabilizacao otica (OIS) captura fotografias extremamente detalhadas, mesmo em ambientes com pouca luz. A bateria massiva de 6500mAh garante autonomia para o dia inteiro, enquanto o carregamento 100W HyperCharge permite carregar rapidamente em poucos minutos.

Ideal para gaming, fotografia, streaming, multitarefa e uso profissional.

ESPECIFICACOES TECNICAS:
Ecra: 6.83" AMOLED 1.5K
Taxa de Atualizacao: 120Hz Ultra Smooth
Brilho Maximo: Ate 3200 nits
Camera Principal: 200MP Ultra Clarity com OIS
Camera Frontal: Alta resolucao para selfies nitidas
Bateria: 6500mAh de longa duracao
Carregamento: 100W HyperCharge
Rede: 5G Ultra Fast
Resistencia: Certificacao IP contra agua e poeira
Ideal para Gaming e Multitarefa
Sensor biometrico rapido e seguro
Som estereo imersivo

PRECO (MZN): 42.000 MZN`,
    price: 42000,
    category: 'celulares',
    image: '/images/produto/redmi-note15.jpeg',
    brand: 'Xiaomi',
    stock: 50
  },

  {
    name: 'Redmi A7 Pro',
    description: `Redmi A7 Pro

DESCRICAO PROFISSIONAL:
O Redmi A7 Pro combina design moderno, excelente autonomia e desempenho estavel para tarefas do dia a dia. O grande ecra de 6.9 polegadas com 120Hz oferece uma navegacao suave e confortavel para videos, TikTok, Facebook, YouTube e jogos leves.

Equipado com processador octa-core e 8GB de RAM expansivel virtualmente, o aparelho garante boa performance em multitarefa. A bateria de 6000mAh foi criada para durar ate varios dias de uso moderado.

A tecnologia Wet Touch 2.0 permite utilizar o ecra mesmo com dedos humidos, ideal para maior praticidade no dia a dia.

ESPECIFICACOES TECNICAS:
Ecra: 6.9" HD+ FullView Display
Taxa de Atualizacao: 120Hz Adaptive Refresh Rate
Processador: Octa-Core de alto desempenho
Memoria RAM: 8GB Expansivel
Armazenamento: 64GB
Camera Traseira: 13MP AI Dual Camera
Camera Frontal: Selfie Camera HD
Bateria: 6000mAh Super Longa Duracao
Carregamento: 15W Fast Charge
Tecnologia Wet Touch 2.0
Conectividade 4G
Alto-falantes potentes para multimedia

PRECO (MZN): 13.500 MZN`,
    price: 13500,
    category: 'celulares',
    image: '/images/produto/redmi-a7-pro.jpeg',
    brand: 'Xiaomi',
    stock: 100
  },

  {
    name: 'Samsung Galaxy S22 Ultra',
    description: `Samsung Galaxy S22 Ultra

DESCRICAO PROFISSIONAL:
O Samsung Galaxy S22 Ultra e o flagship da Samsung com S Pen integrada (como a falecida linha Note). Combina o melhor da linha Galaxy S com a produtividade da S Pen num unico dispositivo.

A camara de 108MP com zoom otico 10x permite captar detalhes impressionantes a longa distancia.

Ideal para: Utilizadores Samsung avancados, produtividade maxima, fotografos moveis e quem sente falta da linha Note.

ESPECIFICACOES TECNICAS:
Tela: 6.8" Dynamic AMOLED 2X, 120Hz, QHD+
CPU: Snapdragon 8 Gen 1
RAM: 8GB
Armazenamento: 256GB
Camara: 108MP + 10MP + 10MP + 12MP
Camara Frontal: 40MP
Bateria: 5000mAh
Carregamento: 45W fast, 15W wireless
S Pen: Inclusa (9ms latencia)

DESTAQUES:
S Pen integrada (notas e produtividade)
Camara 108MP com zoom 100x
Ecra Dynamic AMOLED 120Hz
Bateria 5000mAh para todo o dia
Carregamento 45W rapido

PRECO (MZN): 58.000 MZN`,
    price: 58000,
    category: 'celulares',
    image: 'https://i5.walmartimages.com/seo/Samsung-Galaxy-S22-Ultra-5G-SM-S908U1-256GB-Green-US-Model-Factory-Unlocked-Cell-Phone-Very-Good-Condition_0b4b7166-2688-4e0c-954d-539d5ea29ad9.5946110fe2a2c21cda0b256e2969a555.jpeg',
    brand: 'Samsung',
    stock: 30
  },

  {
    name: 'Samsung Galaxy Z Fold3',
    description: `Samsung Galaxy Z Fold3

DESCRICAO PROFISSIONAL:
O Samsung Galaxy Z Fold3 e o smartphone dobradavel da Samsung que se transforma num tablet de 7.6 polegadas. A tecnologia de display ultra-fina (UTG) e a resistencia IPX8 tornam-no o dobradavel mais durave ate hoje.

A S Pen e compativel (vendida separadamente para o Fold3).

Ideal para: Profissionais que precisam de produtividade, entusiastas de tecnologia, quem quer ecra grande mas portabilidade de smartphone.

ESPECIFICACOES TECNICAS:
Tela Interna: 7.6" AMOLED, 120Hz
Tela Externa: 6.2" AMOLED
CPU: Snapdragon 888
RAM: 12GB
Armazenamento: 256GB
Camara: 12MP tripla
Bateria: 4400mAh
Resistencia: IPX8 (submersivel)
S Pen: Compativel (vendida separadamente)

DESTAQUES:
Ecra interno 7.6" (tablet no bolso)
Resistencia IPX8 (unico dobradavel)
120Hz em ambos os ecras
S Pen compativel (produtividade)
Multitarefa com 3 apps simultaneas

PRECO (MZN): 85.000 MZN`,
    price: 85000,
    category: 'celulares',
    image: 'https://m.media-amazon.com/images/I/71MFE2UY6-L._UF894,1000_QL80_.jpg',
    brand: 'Samsung',
    stock: 30
  },

  {
    name: 'Samsung Galaxy Z Flip3',
    description: `Samsung Galaxy Z Flip3

DESCRICAO PROFISSIONAL:
O Samsung Galaxy Z Flip3 e o smartphone dobradavel compacto da Samsung, com design de concha reminiscente dos antigos flip phones mas com tecnologia de ponta. O ecra externo de 1.9 polegadas permite ver notificacoes e ate tirar selfies sem abrir o telefone.

Com resistencia IPX8, este e o primeiro dobradavel a prova de agua.

Ideal para: Quem quer inovacao e estilo, utilizadores que preferem formato compacto e fas de nostalgia moderna.

ESPECIFICACOES TECNICAS:
Tela Interna: 6.7" AMOLED, 120Hz
Tela Externa: 1.9" Super AMOLED
CPU: Snapdragon 888
RAM: 8GB
Armazenamento: 128GB
Camara: 12MP dupla
Bateria: 3300mAh
Resistencia: IPX8 (submersivel)

DESTAQUES:
Design compacto e elegante
Ecra externo util (notificacoes e selfies)
Resistencia IPX8 (primeiro dobradavel)
Dobra e cabe no bolso
Ecra principal 120Hz

PRECO (MZN): 42.000 MZN`,
    price: 42000,
    category: 'celulares',
    image: 'https://m.media-amazon.com/images/I/61gELRjp5NL._UF894,1000_QL80_.jpg',
    brand: 'Samsung',
    stock: 30
  },

  // ============================================
  // TABLETS
  // ============================================

  {
    name: 'Samsung Galaxy Tab A9+',
    description: `Samsung Galaxy Tab A9+

DESCRICAO PROFISSIONAL:
O Samsung Galaxy Tab A9+ oferece uma experiencia premium com ecra grande de 11 polegadas, excelente qualidade de som e desempenho equilibrado para produtividade e entretenimento.

Perfeito para aulas online, leitura, videos, navegacao e multitarefa, o tablet possui processador Snapdragon 695 5G, garantindo velocidade e eficiencia energetica. Os quatro alto-falantes com Dolby Atmos proporcionam audio imersivo e cinematografico.

O design fino e elegante facilita o transporte para escola, universidade ou trabalho.

ESPECIFICACOES TECNICAS:
Ecra: 11.0" TFT LCD
Taxa de Atualizacao: 90Hz
Processador: Snapdragon 695 5G
Som: Quad Speakers com Dolby Atmos
Conectividade: Wi-Fi / 5G
Bateria de longa duracao
Design fino e moderno
Ideal para estudos e produtividade
Excelente para Netflix, YouTube e jogos
Sistema Samsung seguro e otimizado

PRECO (MZN): 19.000 MZN`,
    price: 19000,
    category: 'tablets',
    image: '/images/produto/samsung-galaxy-tab-a9.jpeg',
    brand: 'Samsung',
    stock: 50
  },

  {
    name: 'iPad Pro 12.9" (2022)',
    description: `iPad Pro 12.9" (2022)

DESCRICAO PROFISSIONAL:
O iPad Pro 12.9" com chip M2 e o tablet mais poderoso alguma vez criado pela Apple. Com desempenho comparavel a MacBooks profissionais, e uma ferramenta de criacao para artistas, designers e profissionais moveis.

O ecra Liquid Retina XDR com tecnologia mini-LED oferece 1000 nits de brilho sustentado e 1600 nits de pico, ideal para edicao de video HDR e design grafico.

Ideal para: Designers graficos, ilustradores (Apple Pencil Gen 2), editores de video moveis e profissionais criativos.

ESPECIFICACOES TECNICAS:
Tela: 12.9" Liquid Retina XDR, 120Hz ProMotion
Chip: Apple M2
RAM: 8-16GB
SSD: ate 1TB
Camara: 12MP + 10MP Ultra-wide
Camara Frontal: 12MP Center Stage
Bateria: ate 10 horas
Conectividade: 5G (opcional), Wi-Fi 6E
Porta: Thunderbolt / USB-4

DESTAQUES:
Chip M2 (desempenho de MacBook)
Ecra Liquid Retina XDR mini-LED
Apple Pencil 2 (hover)
Center Stage para videochamadas
Thunderbolt USB-4

PRECO (MZN): 95.000 MZN`,
    price: 95000,
    category: 'tablets',
    image: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/ipad-pro-13-select-202210_3_3_1_1.png',
    brand: 'Apple',
    stock: 50
  },

  {
    name: 'iPad Air (2022)',
    description: `iPad Air (2022)

DESCRICAO PROFISSIONAL:
O iPad Air (2022) traz o chip M1 para o formato Air pela primeira vez, oferecendo desempenho de nivel Pro a um preco mais acessivel. A tela Liquid Retina de 10.9 polegadas e perfeita para consumo de conteudo, criacao e produtividade.

O suporte ao Apple Pencil (2a geracao) e Magic Keyboard torna-o uma ferramenta versatil para criadores e estudantes.

Ideal para: Estudantes, criadores de conteudo, profissionais moveis e quem quer o melhor desempenho sem pagar o preco do Pro.

ESPECIFICACOES TECNICAS:
Tela: 10.9" Liquid Retina
Chip: Apple M1
RAM: 8GB
SSD: 64-256GB
Camara Frontal: 12MP Center Stage
Bateria: ate 10 horas
Cores: Cinza-espacial, Estelar, Rosa, Roxo, Azul
Porta: USB-C

DESTAQUES:
Chip M1 (desempenho incrivel)
Center Stage para videochamadas
USB-C para conectividade
Apple Pencil 2 suportado
Melhor custo-beneficio da linha iPad

PRECO (MZN): 45.000 MZN`,
    price: 45000,
    category: 'tablets',
    image: 'https://m.media-amazon.com/images/I/61j3ZmlDciL.jpg',
    brand: 'Apple',
    stock: 50
  },

  {
    name: 'iPad Mini (2021)',
    description: `iPad Mini (2021)

DESCRICAO PROFISSIONAL:
O iPad Mini (2021) e o tablet compacto mais poderoso da Apple, com o chip A15 Bionic (o mesmo do iPhone 13). Ideal para quem quer um dispositivo para leitura, notas rapidas, consumo de conteudo e mobilidade extrema.

O ecra Liquid Retina de 8.3 polegadas e perfeito para uso com uma mao.

Ideal para: Leitores avidios, profissionais de campo, estudantes e quem precisa de um tablet ultra portatil.

ESPECIFICACOES TECNICAS:
Tela: 8.3" Liquid Retina
Chip: Apple A15 Bionic
RAM: 4GB
SSD: 64-256GB
Camara Frontal: 12MP Center Stage
Bateria: ate 10 horas
Peso: 293g
Porta: USB-C

DESTAQUES:
Ultra compacto e leve (293g)
Chip A15 Bionic (desempenho superior)
Center Stage para videochamadas
USB-C para conectividade
Apple Pencil 2 suportado

PRECO (MZN): 35.000 MZN`,
    price: 35000,
    category: 'tablets',
    image: 'https://m.media-amazon.com/images/I/71wEKxQlZkL.jpg',
    brand: 'Apple',
    stock: 50
  },

  {
    name: 'Samsung Galaxy Tab S7+',
    description: `Samsung Galaxy Tab S7+

DESCRICAO PROFISSIONAL:
A Samsung Galaxy Tab S7+ e a melhor alternativa Android ao iPad Pro, com ecra Super AMOLED de 12.4 polegadas a 120Hz e S Pen incluida. A bateria de 10090mAh garante mais de 14 horas de uso.

O processador Snapdragon 865+ oferece desempenho fluido ate para jogos pesados e edicao de video leve.

Ideal para: Designers (S Pen para desenho), estudantes (notas e produtividade), criativos e quem prefere Android a iOS.

ESPECIFICACOES TECNICAS:
Tela: 12.4" Super AMOLED, 120Hz, WQXGA+
CPU: Snapdragon 865+
RAM: 8GB
Armazenamento: 128GB + microSD ate 1TB
Bateria: 10090mAh (ate 14 horas)
Carregamento: 45W Super Fast Charge
S Pen: Incluida (9ms latencia)
Audio: 4 speakers AKG com Dolby Atmos

DESTAQUES:
Ecra Super AMOLED 120Hz
S Pen incluida (9ms latencia)
DeX Mode para produtividade PC-like
Bateria gigante (10090mAh)
4 altifalantes AKG

PRECO (MZN): 28.000 MZN`,
    price: 28000,
    category: 'tablets',
    image: 'https://hanoicomputercdn.com/media/product/60370_may_tinh_bang_samsung_galaxy_tab_s7_plus_128gb_den.png',
    brand: 'Samsung',
    stock: 30
  },

  // ============================================
  // COMPUTADORES (NOTEBOOKS E DESKTOPS)
  // ============================================

  {
    name: 'MacBook Air M2',
    description: `MacBook Air M2

DESCRICAO PROFISSIONAL:
O MacBook Air M2 redefine o que significa portabilidade com poder. Com um design ultrafino de apenas 1.13cm de espessura e peso de apenas 1.24kg, este e o notebook perfeito para quem vive em movimento sem sacrificar performance.

O chip M2 traz uma CPU de 8 nucleos e GPU de ate 10 nucleos, entregando ate 3.5x mais desempenho que os modelos Intel anteriores. A tela Liquid Retina de 13.6 polegadas e maior e mais brilhante, com suporte a 1 biliao de cores.

Ideal para: Estudantes, profissionais criativos, programadores, freelancers e qualquer pessoa que valorize mobilidade.

ESPECIFICACOES TECNICAS:
Tela: 13.6" Liquid Retina, 2560x1664, 500 nits
Chip: Apple M2 (8 CPU + 10 GPU)
RAM: 8GB
SSD: 256GB
Bateria: ate 18 horas
Carregamento: MagSafe 3, 2x USB-C
Camara: 1080p FaceTime HD
Audio: 4 alto-falantes com Dolby Atmos
Peso: 1.24 kg
Cores: Meia-noite, Estelar, Cinza-espacial, Prateado

DESTAQUES:
Chip M2 (desempenho 3.5x superior)
Design ultrafino (1.13cm) e ultraleve (1.24kg)
Funcionamento silencioso (sem ventoinhas)
MagSafe 3 para carregamento magnetico
Camara 1080p FaceTime HD
Bateria de 18 horas

PRECO (MZN): 95.000 MZN`,
    price: 95000,
    category: 'computadores',
    image: 'https://cdn8.web4s.vn/media/products/mac-air-m2/macbookairm2-midnight%201.jpg',
    brand: 'Apple',
    stock: 50
  },

  {
    name: 'MacBook Pro 14" M2 Pro',
    description: `MacBook Pro 14" M2 Pro

DESCRICAO PROFISSIONAL:
O MacBook Pro 14" com chip M2 Pro e uma estacao de trabalho portatil criada para profissionais exigentes. Combina o ecra Liquid Retina XDR de referencia com o chip mais avancado da Apple para notebooks profissionais.

Equipado com o chip M2 Pro (ate 12 nucleos CPU e 19 nucleos GPU), este MacBook entrega performance extraordinaria para tarefas pesadas como edicao de video 8K, programacao de grande escala e modelacao 3D.

Ideal para: Editores de video profissionais, engenheiros de software, designers 3D, arquitetos e fotografos profissionais.

ESPECIFICACOES TECNICAS:
Tela: 14.2" Liquid Retina XDR, 3024x1964, 120Hz ProMotion
Chip: Apple M2 Pro (ate 12 nucleos CPU)
RAM: 16GB
SSD: 512GB
Bateria: ate 17 horas
Camara: 1080p FaceTime HD
Audio: 6 alto-falantes com Audio Espacial
Portas: HDMI, 3x Thunderbolt 4, SDXC, MagSafe
Peso: 1.6 kg

DESTAQUES:
Chip M2 Pro (ate 12 nucleos CPU)
Ecra Liquid Retina XDR com 1600 nits
ProMotion 120Hz para fluidez absoluta
6 alto-falantes com Audio Espacial
Portas profissionais (HDMI, SDXC)

PRECO (MZN): 135.000 MZN`,
    price: 135000,
    category: 'computadores',
    image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/refurb-mbp14-m2-silver-202303',
    brand: 'Apple',
    stock: 30
  },

  {
    name: 'Apple MacBook Pro 16" (2021)',
    description: `Apple MacBook Pro 16" (2021)

DESCRICAO PROFISSIONAL:
O MacBook Pro 16" com chip M1 Pro e uma das maquinas mais poderosas da Apple, feita para profissionais exigentes que precisam de maxima performance em tarefas pesadas como edicao de video 8K, desenvolvimento de software complexo e renderizacao 3D.

O ecra Liquid Retina XDR de 16 polegadas oferece 1000 nits de brilho sustentado e 1600 nits de pico para conteudo HDR, com tecnologia ProMotion de 120Hz para fluidez incomparavel.

Ideal para: Criadores de conteudo profissional, developers, engenheiros de machine learning, designers 3D e qualquer profissional que exija o maximo.

ESPECIFICACOES TECNICAS:
Tela: 16" Liquid Retina XDR, 3456x2234, 120Hz ProMotion
Chip: Apple M1 Pro (10 nucleos CPU)
RAM: 16GB
SSD: 512GB
Bateria: ate 21 horas
Camara: 1080p FaceTime HD
Portas: HDMI, 3x Thunderbolt 4, SDXC, MagSafe
Peso: 2.1 kg

DESTAQUES:
Ecra Liquid Retina XDR 16" (referencia)
Bateria de 21 horas (maior autonomia)
Chip M1 Pro (performance extrema)
6 alto-falantes com Audio Espacial
Portas profissionais sem adaptadores

PRECO (MZN): 170.000 MZN`,
    price: 170000,
    category: 'computadores',
    image: 'https://m.media-amazon.com/images/I/615Ovlhw+XL.jpg',
    brand: 'Apple',
    stock: 25
  },

  {
    name: 'Mac Mini M1',
    description: `Mac Mini M1

DESCRICAO PROFISSIONAL:
O Mac Mini M1 e o desktop compacto mais poderoso da Apple. Com o chip M1, oferece desempenho ate 3x superior em CPU e 6x superior em GPU em comparacao com a geracao anterior, tudo num chassis de apenas 19.7x19.7cm.

Ideal para escritorios, programadores, criadores de conteudo, servidores domesticos e setups minimalistas que exigem potencia sem ocupar espaco.

ESPECIFICACOES TECNICAS:
Chip: Apple M1 (8 nucleos CPU + 8 nucleos GPU)
RAM: 8GB (configuravel ate 16GB)
SSD: 256GB (configuravel ate 2TB)
Portas: 2x Thunderbolt 4, 2x USB-A, HDMI 2.0, Ethernet
Peso: 1.2kg
Conectividade: Wi-Fi 6, Bluetooth 5.0

DESTAQUES:
Chip M1 (desempenho ate 6x GPU)
Design compacto e elegante
Funcionamento silencioso
Portas Thunderbolt 4 de alta velocidade
Ideal para setup dual monitor

PRECO (MZN): 45.000 MZN`,
    price: 45000,
    category: 'computadores',
    image: 'https://m.media-amazon.com/images/I/71pcTYT+ICL._UF894,1000_QL80_.jpg',
    brand: 'Apple',
    stock: 20
  },

  {
    name: 'Dell XPS 15',
    description: `Dell XPS 15

DESCRICAO PROFISSIONAL:
O Dell XPS 15 e um dos laptops mais premium do mercado, combinando potencia extrema com design sofisticado em aluminio CNC e fibra de carbono. A tela 4K OLED InfinityEdge oferece cores profissionais 100% DCI-P3, perfeita para edicao de video, fotografia e design grafico.

Equipado com GPU dedicada NVIDIA RTX 3050, permite trabalhar com softwares pesados como Adobe Premiere, AutoCAD e Blender.

Ideal para: Criadores de conteudo, engenheiros, designers graficos e profissionais exigentes.

ESPECIFICACOES TECNICAS:
Tela: 15.6" 4K UHD+ OLED, 100% DCI-P3
CPU: Intel Core i7 (12a geracao) ate 14 nucleos
GPU: NVIDIA RTX 3050 (4GB)
RAM: 16GB DDR5
SSD: 512GB NVMe
Bateria: 86Wh (ate 10 horas)
Peso: 1.96kg
Material: Aluminio CNC + fibra de carbono

DESTAQUES:
Tela 4K OLED InfinityEdge (100% DCI-P3)
GPU RTX 3050 dedicada
Construcao em fibra de carbono/aluminio
Thunderbolt 4 para conexoes rapidas
Leitor SD para fotografos

PRECO (MZN): 125.000 MZN`,
    price: 125000,
    category: 'computadores',
    image: 'https://astringo-rugged.com/wp-content/uploads/2021/12/XPS-9510a.jpg',
    brand: 'Dell',
    stock: 20
  },

  {
    name: 'Dell XPS 13',
    description: `Dell XPS 13

DESCRICAO PROFISSIONAL:
O Dell XPS 13 e o ultraportatil de elite, feito para mobilidade total. E fino, leve e extremamente poderoso, ideal para estudantes, empresarios e profissionais que precisam de potencia onde quer que estejam.

A tela InfinityEdge de 13.4 polegadas com resolucao 4K UHD+ e bordas ultrafinas oferece experiencia visual imersiva num corpo compacto.

Ideal para: Profissionais moveis, estudantes universitarios, empresarios e qualquer pessoa que valorize portabilidade.

ESPECIFICACOES TECNICAS:
Tela: 13.4" InfinityEdge 4K UHD+
CPU: Intel Core i7 (12a geracao)
RAM: 16GB LPDDR5
SSD: 512GB NVMe
Bateria: ate 11 horas
Peso: 1.27kg
Material: Aluminio + fibra de carbono

DESTAQUES:
Tela InfinityEdge 4K UHD+
Ultraportatil (1.27kg) para mobilidade
Construcao premium em aluminio
Processador Intel Core i7 potente
Bateria de longa duracao

PRECO (MZN): 85.000 MZN`,
    price: 85000,
    category: 'computadores',
    image: 'https://product.hstatic.net/1000331874/product/dell_xps_13_dc9a366cc90c495b9a3da844f2a08cb9_1024x1024.jpg',
    brand: 'Dell',
    stock: 30
  },

  {
    name: 'Dell Inspiron 15 Laptop',
    description: `Dell Inspiron 15 Laptop

DESCRICAO PROFISSIONAL:
O Dell Inspiron 15 e o laptop acessivel perfeito para o dia a dia. Com performance solida para trabalho, estudos e entretenimento, oferece excelente custo-beneficio sem comprometer a qualidade Dell.

A tela Full HD de 15.6 polegadas com acabamento antirreflexo permite longas horas de uso sem cansaco visual, ideal para estudantes e profissionais.

Ideal para: Estudantes, uso domestico, trabalho de escritorio, navegacao na internet e streaming de conteudo.

ESPECIFICACOES TECNICAS:
Tela: 15.6" Full HD, antirreflexo
CPU: Intel Core i5
RAM: 8GB DDR4
SSD: 256GB
Bateria: ate 7 horas
Peso: 1.8kg
Cor: Preto carbono

DESTAQUES:
Excelente custo-beneficio
Tela Full HD antirreflexo
Processador Intel Core i5
SSD rapido para inicializacao
Design pratico e durave

PRECO (MZN): 45.000 MZN`,
    price: 45000,
    category: 'computadores',
    image: 'https://m.media-amazon.com/images/I/51OQ4248r-L._UF894,1000_QL80_.jpg',
    brand: 'Dell',
    stock: 20
  },

  {
    name: 'LG Gram 17" Laptop',
    description: `LG Gram 17" Laptop

DESCRICAO PROFISSIONAL:
O LG Gram 17" e o laptop de 17 polegadas mais leve do mundo, pesando apenas 1.35kg. Apesar do peso reduzido, mantem bateria de longa duracao (ate 12 horas) e certificacao de resistencia militar.

Ideal para: Profissionais que precisam de ecra grande mas nao querem carregar peso, viajantes, executivos e programadores.

ESPECIFICACOES TECNICAS:
Tela: 17" WQXGA (2560x1600)
CPU: Intel Core i7 (12a geracao)
RAM: 16GB
SSD: 512GB
Bateria: ate 12 horas
Peso: 1.35kg (extremamente leve)
Certificacao: MIL-STD-810G

DESTAQUES:
Leveza recorde (1.35kg para 17")
Tela WQXGA (2560x1600)
Bateria de longa duracao
Certificacao militar de resistencia
Ideal para mobilidade com ecra grande

PRECO (MZN): 115.000 MZN`,
    price: 115000,
    category: 'computadores',
    image: 'https://lapvip.vn/upload/products/original/lg-gram-17-20232-1700187329.jpg',
    brand: 'LG',
    stock: 20
  },

  {
    name: 'LG Gram 14" Laptop',
    description: `LG Gram 14" Laptop

DESCRICAO PROFISSIONAL:
O LG Gram 14" e o ultraportatil topo de gama da LG, pesando apenas 1.0kg — um dos laptops mais leves da sua categoria. A tela WQXGA (2560x1600) oferece excelente nitidez para trabalho e multimedia.

Ideal para: Profissionais moveis, estudantes, viajantes frequentes e quem prioriza peso minimo.

ESPECIFICACOES TECNICAS:
Tela: 14" WQXGA (2560x1600)
CPU: Intel Core i7
RAM: 16GB
SSD: 512GB
Bateria: ate 11 horas
Peso: 1.0kg (ultraleve)
Certificacao: MIL-STD-810G

DESTAQUES:
Peso recorde (1.0kg)
Tela WQXGA de alta resolucao
Bateria de ate 11 horas
Construcao ultra resistente
Ideal para quem vive em movimento

PRECO (MZN): 85.000 MZN`,
    price: 85000,
    category: 'computadores',
    image: 'https://m.media-amazon.com/images/I/71Y8Jwu4DHL._UF894,1000_QL80_.jpg',
    brand: 'LG',
    stock: 20
  },

  {
    name: 'Microsoft Surface Laptop 4',
    description: `Microsoft Surface Laptop 4

DESCRICAO PROFISSIONAL:
O Microsoft Surface Laptop 4 e o laptop elegante da Microsoft, com ecra PixelSense de 13.5 polegadas e processadores Intel Core ou AMD Ryzen. O design minimalista e materiais premium (Alcantara ou metal) conferem um aspeto sofisticado.

Ideal para: Profissionais criativos, estudantes, executivos e utilizadores do ecossistema Microsoft.

ESPECIFICACOES TECNICAS:
Tela: 13.5" PixelSense, 2256x1504
CPU: AMD Ryzen 5 / Intel Core i7
RAM: 8-16GB
SSD: 512GB
Bateria: ate 11 horas
Peso: 1.28kg
Cores: Platina, Preto, Arenito
Material: Alcantara (teclado) ou metal

DESTAQUES:
Ecra PixelSense 3:2 (melhor para trabalho)
Design elegante e premium
Bateria de longa duracao
Windows 11 Pro otimizado
Opcao AMD Ryzen com bom desempenho

PRECO (MZN): 95.000 MZN`,
    price: 95000,
    category: 'computadores',
    image: 'https://m.media-amazon.com/images/I/617for1TmjL.jpg',
    brand: 'Microsoft',
    stock: 25
  },

  {
    name: 'Microsoft Surface Pro 8',
    description: `Microsoft Surface Pro 8

DESCRICAO PROFISSIONAL:
O Microsoft Surface Pro 8 e o tablet 2-em-1 da Microsoft, combinando a portabilidade de um tablet com a potencia de um laptop. A tela de 13" com taxa de 120Hz e a melhor num Surface Pro ate hoje.

Compativeis com a Surface Pen e o teclado Type Cover (vendidos separadamente).

Ideal para: Profissionais moveis, designers, estudantes e quem precisa de versatilidade.

ESPECIFICACOES TECNICAS:
Tela: 13" Touchscreen, 2880x1920, 120Hz
CPU: Intel Core i5/i7
RAM: 8-16GB
SSD: 256-512GB
Bateria: ate 10 horas
Peso: 0.9kg (apenas tablet)
Conectividade: Wi-Fi 6, Bluetooth

DESTAQUES:
Tela 120Hz super fluida
Design 2-em-1 (tablet + laptop)
Leve e portatil (0.9kg)
Surface Pen com baixa latencia
Compativeis com Type Cover

PRECO (MZN): 110.000 MZN`,
    price: 110000,
    category: 'computadores',
    image: 'https://i5.walmartimages.com/seo/Microsoft-Surface-Pro-8-13-2880x1920-i5-1135G7-8-256GB-SSD-GRAPHITE_2420c241-6f5d-414e-8ea7-9fd21f5c738e.a52cad9a8bb4e28eea851090f3df36c3.jpeg',
    brand: 'Microsoft',
    stock: 25
  },

  {
    name: 'Microsoft Surface Laptop Go',
    description: `Microsoft Surface Laptop Go

DESCRICAO PROFISSIONAL:
O Microsoft Surface Laptop Go e a versao economica e compacta do Surface Laptop, com ecra de 12.4 polegadas e peso de apenas 1.11kg. Ideal para estudantes e uso diario.

Mantem o design premium da Microsoft a um preco acessivel.

Ideal para: Estudantes, uso domestico, segundo computador e quem procura um laptop Windows com bom design a preco justo.

ESPECIFICACOES TECNICAS:
Tela: 12.4" PixelSense
CPU: Intel Core i5
RAM: 8GB
SSD: 128GB
Bateria: ate 10 horas
Peso: 1.11kg
Cores: Platina, Azul gelo, Arenito

DESTAQUES:
Excelente portabilidade (1.11kg)
Design Surface premium
Windows 11 otimizado
Bateria de 10 horas
Melhor custo-beneficio Surface

PRECO (MZN): 55.000 MZN`,
    price: 55000,
    category: 'computadores',
    image: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/FL2C-A-BB-00',
    brand: 'Microsoft',
    stock: 25
  },

  {
    name: 'Microsoft Surface Pro X',
    description: `Microsoft Surface Pro X

DESCRICAO PROFISSIONAL:
O Microsoft Surface Pro X e o Surface Pro mais fino e leve, com processador ARM Microsoft SQ (baseado em Qualcomm). A grande vantagem e a conectividade 4G LTE integrada, permitindo estar sempre ligado sem necessidade de hotspot.

Ideal para: Profissionais que precisam de conectividade constante, consultores, vendedores ambulantes e quem trabalha em movimento.

ESPECIFICACOES TECNICAS:
Tela: 13" Touchscreen
CPU: ARM Microsoft SQ1/SQ2
RAM: 16GB
SSD: 256GB
LTE: Integrado (4G)
Peso: 0.8kg
Bateria: ate 10 horas

DESTAQUES:
LTE integrado (sempre conectado)
Ultra leve (0.8kg)
Design premium e fino
Bateria de longa duracao
Windows em ARM com boa autonomia

PRECO (MZN): 90.000 MZN`,
    price: 90000,
    category: 'computadores',
    image: 'https://m.media-amazon.com/images/I/71cEgrftILL.jpg',
    brand: 'Microsoft',
    stock: 25
  },

  // ============================================
  // GAMING
  // ============================================

  {
    name: 'Dell Alienware m15 R6 Gaming Laptop',
    description: `Dell Alienware m15 R6 Gaming Laptop

DESCRICAO PROFISSIONAL:
O Alienware m15 R6 e o laptop gamer premium da Dell, projetado para entusiastas de jogos que exigem o melhor em performance e design. Com tela de 165Hz e GPU RTX 3060, oferece fluidez incomparavel nos jogos mais exigentes.

O sistema de arrefecimento Alienware Cryo-Tech mantem o laptop frio mesmo durante longas sessoes de gaming.

Ideal para: Gamers hardcore, streamers, criadores de conteudo de jogos e entusiastas de e-sports.

ESPECIFICACOES TECNICAS:
Tela: 15.6" 165Hz, baixa latencia
CPU: Intel Core i7
GPU: NVIDIA RTX 3060
RAM: 16GB
SSD: 512GB NVMe
Arrefecimento: Alienware Cryo-Tech
RGB: Teclado RGB AlienFX

DESTAQUES:
Tela 165Hz para fluidez maxima
GPU RTX 3060 para jogos pesados
Sistema de arrefecimento avancado
Design Alienware iconico
Teclado RGB personalizavel

PRECO (MZN): 120.000 MZN`,
    price: 120000,
    category: 'gaming',
    image: 'https://m.media-amazon.com/images/I/71J1lHBTo3L._UF894,1000_QL80_.jpg',
    brand: 'Dell',
    stock: 20
  },

  {
    name: 'PC Gamer Gaming Desktop - MSI Infinite S 10th',
    description: `PC Gamer MSI Infinite S 10th

DESCRICAO PROFISSIONAL:
O MSI Infinite S 10th e um desktop gamer compacto da MSI, parte da linha conhecida pela qualidade e arrefecimento robusto. Equipado com Intel Core i7 e RTX 2060, corre jogos AAA a 1080p de forma fluida.

O design e elegante com iluminacao RGB personalizavel.

Ideal para: Gamers com espaco limitado, entusiastas de RGB e quem procura um PC gamer compacto mas potente.

ESPECIFICACOES TECNICAS:
CPU: Intel Core i7
GPU: NVIDIA RTX 2060 (6GB GDDR6)
RAM: 16GB DDR4
SSD: 512GB NVMe
HDD: Espaco para expansao
Arrefecimento: Tecnologia MSI Silent Storm
RGB: Iluminacao personalizavel
Extras: Porta USB-C frontal

DESTAQUES:
Design compacto (economiza espaco)
GPU RTX 2060 para jogos a 1080p
Arrefecimento MSI Silent Storm
Iluminacao RGB personalizavel
Bom custo-beneficio para gaming

PRECO (MZN): 115.000 MZN`,
    price: 115000,
    category: 'gaming',
    image: 'https://asset.msi.com/resize/image/global/product/product_160938367260ccf8835e20a8948a748430edc234e1.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
    brand: 'MSI',
    stock: 10
  },

  {
    name: 'ASUS ROG Strix G15 Gaming Laptop',
    description: `ASUS ROG Strix G15 Gaming Laptop

DESCRICAO PROFISSIONAL:
O ASUS ROG Strix G15 e um laptop gamer potente com ecra de 144Hz (ideal para e-sports), processador AMD Ryzen 7 e GPU RTX 3060. O sistema de arrefecimento ROG Intelligent Cooling mantem o laptop frio durante longas sessoes.

O design gamer com iluminacao RGB e caracteristico da linha ROG.

Ideal para: Gamers portateis, estudantes gamers, e-sports enthusiasts e quem joga competitivamente.

ESPECIFICACOES TECNICAS:
Tela: 15.6" 144Hz (3ms resposta)
CPU: AMD Ryzen 7
GPU: NVIDIA RTX 3060 (6GB)
RAM: 16GB DDR4
SSD: 512GB NVMe
Arrefecimento: ROG Intelligent Cooling
RGB: Teclado RGB Aura Sync
Conectividade: Wi-Fi 6

DESTAQUES:
Tela 144Hz para gaming competitivo
CPU Ryzen 7 (bom desempenho multicore)
GPU RTX 3060 para jogos pesados
Arrefecimento ROG avancado
Design gamer RGB

PRECO (MZN): 105.000 MZN`,
    price: 105000,
    category: 'gaming',
    image: 'https://m.media-amazon.com/images/I/71OyrTkxpGL.jpg',
    brand: 'ASUS',
    stock: 15
  },

  {
    name: 'HP Omen 30L Gaming Desktop',
    description: `HP Omen 30L Gaming Desktop

DESCRICAO PROFISSIONAL:
O HP Omen 30L e um desktop gamer de alto desempenho, equipado com Intel Core i7 e RTX 3070, ideal para jogos AAA a 1440p ou 4K, streaming e criacao de conteudo. O sistema de arrefecimento Omen e eficiente e silencioso.

A iluminacao RGB no painel frontal confere um aspeto agressivo e gaming.

Ideal para: Gamers hardcore, streamers e criadores de conteudo que precisam de potencia.

ESPECIFICACOES TECNICAS:
CPU: Intel Core i7 (alto desempenho)
GPU: NVIDIA RTX 3070 (8GB GDDR6)
RAM: 16-32GB DDR4
SSD: NVMe + HDD para armazenamento extra
Arrefecimento: Sistema Omen de alto fluxo
RGB: Painel frontal RGB

DESTAQUES:
GPU RTX 3070 (performance 1440p/4K)
CPU Intel Core i7 potente
Expansivel (RAM, SSD, HDD)
Design gamer premium
Ideal para streaming e criacao de conteudo

PRECO (MZN): 135.000 MZN`,
    price: 135000,
    category: 'gaming',
    image: 'https://i5.walmartimages.com/asr/f7e4789b-6186-4669-be30-b72a9ac680f5.6ccc317d4875b0f65f622a615a80dd64.jpeg',
    brand: 'HP',
    stock: 10
  },

  {
    name: 'Lenovo Legion 5 Gaming Laptop',
    description: `Lenovo Legion 5 Gaming Laptop

DESCRICAO PROFISSIONAL:
O Lenovo Legion 5 e o laptop gamer melhor equilibrado da Lenovo, combinando preco acessivel com componentes solidos. Ecra 144Hz, Ryzen 7 e RTX 3060 entregam excelente performance para jogos a 1080p.

O teclado Legion TrueStrike e confortavel para longas sessoes de gaming.

Ideal para: Gamers com orcamento equilibrado, estudantes e quem procura o melhor custo-beneficio em gaming.

ESPECIFICACOES TECNICAS:
Tela: 15.6" 144Hz
CPU: AMD Ryzen 7
GPU: NVIDIA RTX 3060
RAM: 16GB
SSD: 512GB NVMe
Teclado: Legion TrueStrike
Arrefecimento: Dual fan com Coldfront
RGB: Teclado RGB opcional

DESTAQUES:
Excelente custo-beneficio
Tela 144Hz para gaming fluido
Ryzen 7 + RTX 3060 (boa combinacao)
Arrefecimento eficiente (Coldfront)
Teclado confortavel para gaming

PRECO (MZN): 95.000 MZN`,
    price: 95000,
    category: 'gaming',
    image: 'https://m.media-amazon.com/images/I/51905A7uIVS.jpg',
    brand: 'Lenovo',
    stock: 20
  },

  {
    name: 'Acer Predator Helios 300 Gaming Laptop',
    description: `Acer Predator Helios 300 Gaming Laptop

DESCRICAO PROFISSIONAL:
O Acer Predator Helios 300 e um laptop gamer robusto e agressivo, com ecra 144Hz, Intel Core i7 e RTX 3060. O sistema de arrefecimento AeroBlade 3D mantem o laptop frio mesmo sob carga maxima.

O design com backlight RGB e bordas agressivas e caracteristico da linha Predator.

Ideal para: Gamers que preferem Intel e design agressivo, streamers iniciantes.

ESPECIFICACOES TECNICAS:
Tela: 15.6" 144Hz
CPU: Intel Core i7
GPU: NVIDIA RTX 3060
RAM: 16GB
SSD: 512GB NVMe
Arrefecimento: AeroBlade 3D (5th gen)
RGB: Teclado RGB Predator
Audio: DTS:X Ultra

DESTAQUES:
Arrefecimento AeroBlade 3D (avancado)
Tela 144Hz para gaming competitivo
CPU Intel Core i7 (boa performance)
Design agressivo e gaming
Bom sistema de audio DTS:X

PRECO (MZN): 110.000 MZN`,
    price: 110000,
    category: 'gaming',
    image: 'https://m.media-amazon.com/images/I/61rjV21bzfL.jpg',
    brand: 'Acer',
    stock: 15
  },

  {
    name: 'CyberPowerPC Gamer Xtreme VR Gaming PC',
    description: `CyberPowerPC Gamer Xtreme VR Gaming PC

DESCRICAO PROFISSIONAL:
O CyberPowerPC Gamer Xtreme VR e um desktop gamer ready-to-go, otimizado para realidade virtual e jogos AAA. Com Intel Core i5/i7 e GPU GTX 1660 ou RTX 2060, corre grande parte dos jogos a 1080p de forma fluida.

Ideal para: Quem quer um PC gamer pre-montado sem complicacoes de construcao, entusiastas de VR.

ESPECIFICACOES TECNICAS:
CPU: Intel Core i5 / i7
GPU: GTX 1660 / RTX 2060
RAM: 16GB DDR4
SSD: SSD + HDD (armazenamento combinado)
Arrefecimento: RGB cooling system
RGB: Iluminacao RGB personalizavel
Certificacao: VR Ready

DESTAQUES:
Pronto para VR (certificado)
PC pre-montado (nao precisa montar)
Expansivel facilmente
Iluminacao RGB personalizavel
Bom custo-beneficio para gaming

PRECO (MZN): 120.000 MZN`,
    price: 120000,
    category: 'gaming',
    image: 'https://m.media-amazon.com/images/I/71aGDRGJlJL.jpg',
    brand: 'CyberPowerPC',
    stock: 10
  },

  {
    name: 'Razer Blade 15 Gaming Laptop',
    description: `Razer Blade 15 Gaming Laptop

DESCRICAO PROFISSIONAL:
O Razer Blade 15 Gaming Laptop e o laptop gamer mais elegante do mercado, com design discreto em aluminio preto (inspirado nos MacBooks). Equipado com Intel Core i7 e RTX 3060, e potente e leve.

O teclado Razer Chroma RGB e personalizavel por tecla.

Ideal para: Gamers com estilo, profissionais criativos que tambem jogam, quem precisa de laptop gamer discreto.

ESPECIFICACOES TECNICAS:
Tela: 15.6" 144Hz
CPU: Intel Core i7
GPU: NVIDIA RTX 3060 (6GB)
RAM: 16GB DDR4
SSD: 512GB NVMe
Teclado: Razer Chroma RGB
Peso: 2.2kg (leve para gaming)
Material: Aluminio

DESTAQUES:
Design premium em aluminio (discreto)
Teclado Razer Chroma RGB personalizavel
Leve para um laptop gamer (2.2kg)
Tela 144Hz para gaming fluido
Perfil baixo ideal para trabalho e gaming

PRECO (MZN): 120.000 MZN`,
    price: 120000,
    category: 'gaming',
    image: 'https://m.media-amazon.com/images/I/61wi86i8CZL._UF894,1000_QL80_.jpg',
    brand: 'Razer',
    stock: 20
  },

  // ============================================
  // ELETRONICOS (AUDIO, CAMERAS, TVs, ACESSORIOS)
  // ============================================

  {
    name: 'Sony WH-1000XM5 Headphones',
    description: `Sony WH-1000XM5

DESCRICAO PROFISSIONAL:
Os Sony WH-1000XM5 sao reconhecidos mundialmente como os headphones com o melhor cancelamento de ruido do mercado. A Sony elevou ainda mais o padrao com o processador V1 e o chip QN1 trabalhando em conjunto para eliminar ruidos em todas as frequencias.

O design e completamente renovado, com arco macio e almofadas de couro sintetico que permitem horas de uso sem desconforto.

Ideal para: Viajantes frequentes, profissionais em open spaces, estudantes e audiofilos exigentes.

ESPECIFICACOES TECNICAS:
Tipo: Over-ear
Cancelamento: ANC inteligente (V1 + AI)
Bateria: ate 30 horas
Carregamento: 3 min = 3h uso
Bluetooth: 5.2
Codecs: LDAC, AAC, SBC
Peso: 250g
Microfones: 8 para ANC + 4 para voz

DESTAQUES:
Cancelamento de ruido no 1 mundial
Bateria 30h com carregamento rapido
Codec LDAC (audio Hi-Res)
Design ergonomico e leve (250g)
8 microfones para cancelamento superior

PRECO (MZN): 32.000 MZN`,
    price: 32000,
    category: 'eletronicos',
    image: 'https://bizweb.dktcdn.net/100/340/129/products/wh1000xm5-midnightblue-2-cuongphanvn.jpg',
    brand: 'Sony',
    stock: 200
  },

  {
    name: 'Sony WH-1000XM4 Headphones',
    description: `Sony WH-1000XM4 Headphones

DESCRICAO PROFISSIONAL:
Os Sony WH-1000XM4 sao a geracao anterior do melhor cancelamento de ruido do mundo, ainda oferecendo qualidade excepcional a um preco mais acessivel. O chip QN1 e o processador Bluetooth proporcionam uma experiencia de audio premium.

Com tecnologia DSEE Extreme, os XM4 elevam a qualidade de musica comprimida (MP3) para perto da qualidade de CD.

Ideal para: Quem quer o melhor ANC sem pagar o preco do modelo mais recente, viajantes e profissionais.

ESPECIFICACOES TECNICAS:
Tipo: Over-ear
Cancelamento: ANC QN1
Bateria: ate 30 horas
Carregamento: USB-C
Bluetooth: 5.0
Codecs: LDAC, AAC, SBC
Peso: 254g
Tecnologia: DSEE Extreme

DESTAQUES:
Cancelamento de ruido lider de mercado
Tecnologia DSEE Extreme (upscaling de audio)
Bateria de 30 horas
Codec LDAC para alta resolucao
Fala para ambiente e deteccao de uso

PRECO (MZN): 28.000 MZN`,
    price: 28000,
    category: 'eletronicos',
    image: 'https://www.sony.com.vn/image/5d02da5df552836db894cead8a68f5f3?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF',
    brand: 'Sony',
    stock: 100
  },

  {
    name: 'Sony WH-CH710N Headphones',
    description: `Sony WH-CH710N Headphones

DESCRICAO PROFISSIONAL:
Os Sony WH-CH710N sao a opcao economica da Sony para quem quer cancelamento de ruido de qualidade sem gastar muito. Com bateria de 35 horas, sao perfeitos para longas viagens e dias de trabalho intenso.

Leves (223g) e confortaveis, oferecem boa qualidade de audio com a confiabilidade da marca Sony.

Ideal para: Estudantes, viajantes ocasionais e quem quer entrar no mundo do ANC sem investimento elevado.

ESPECIFICACOES TECNICAS:
Tipo: Over-ear
Cancelamento: ANC dual
Bateria: ate 35 horas
Carregamento: USB-C, 10 min = 1h
Bluetooth: 5.0
Peso: 223g
Microfones: Duplos para chamadas

DESTAQUES:
Excelente custo-beneficio
Bateria de 35 horas (recorde na categoria)
Leves e confortaveis (223g)
Carregamento rapido (10 min = 1h)
Qualidade Sony confiavel

PRECO (MZN): 16.000 MZN`,
    price: 16000,
    category: 'eletronicos',
    image: 'https://m.media-amazon.com/images/I/51VQwL2+wuL._UF894,1000_QL80_.jpg',
    brand: 'Sony',
    stock: 100
  },

  {
    name: 'Sony WH-XB900N Headphones',
    description: `Sony WH-XB900N Headphones

DESCRICAO PROFISSIONAL:
Os Sony WH-XB900N sao a linha Extra Bass da Sony, focada em graves profundos e intensos sem sacrificar o cancelamento de ruido. Perfeitos para quem ama musica electronica, hip-hop, e estilos com batidas pesadas.

A tecnologia Extra Bass reforca as frequencias graves, proporcionando uma experiencia sonora energetica e imersiva.

Ideal para: Amantes de musica com enfase em graves, fas de hip-hop/electronica, entusiastas de som potente.

ESPECIFICACOES TECNICAS:
Tipo: Over-ear
Tecnologia: Extra Bass (reforco de graves)
Cancelamento: ANC
Bateria: ate 30 horas
Carregamento: USB-C
Bluetooth: 5.0
Peso: 254g
Extras: Equalizador personalizavel

DESTAQUES:
Tecnologia Extra Bass (graves profundos)
Cancelamento de ruido ativo
Bateria de 30 horas
Design moderno e confortavel
Ideal para musica electronica/hip-hop

PRECO (MZN): 20.000 MZN`,
    price: 20000,
    category: 'eletronicos',
    image: 'https://m.media-amazon.com/images/I/51VlRUpPWqL._UF894,1000_QL80_.jpg',
    brand: 'Sony',
    stock: 100
  },

  {
    name: 'Sony A7 IV',
    description: `Sony A7 IV

DESCRICAO PROFISSIONAL:
A Sony A7 IV e a mais recente mirrorless full-frame da serie A7, combinando sensor de 33MP e capacidades de video 4K 60fps 10-bit. E uma ferramenta completa para criadores de conteudo que precisam de um equipamento hibrido (foto e video) profissional.

O processador BIONZ XR tem o dobro da capacidade de processamento em relacao aos modelos anteriores, resultando em autofoco de 759 pontos e rastreamento ocular em tempo real.

Ideal para: Fotografos profissionais, criadores de conteudo YouTube/Instagram, videografos e amadores avancados.

ESPECIFICACOES TECNICAS:
Sensor: Full-frame 33MP
Video: 4K 60fps 10-bit 4:2:2
Processador: BIONZ XR
Autofoco: 759 pontos com rastreamento ocular
Estabilizacao: IBIS 5 eixos
ISO: 100-51200
Peso: 658g
Conectividade: Wi-Fi, Bluetooth, USB-C

DESTAQUES:
Video 4K 60fps 10-bit 4:2:2 (profissional)
759 pontos AF com rastreamento de olhos
IBIS 5 eixos (estabilizacao integrada)
Ecra articulavel para vlogging
Sensor 33MP full-frame

PRECO (MZN): 160.000 MZN`,
    price: 160000,
    category: 'eletronicos',
    image: 'https://zshop.vn/images/detailed/92/1634812545_1667800.jpg',
    brand: 'Sony',
    stock: 10
  },

  {
    name: 'Sony A7C',
    description: `Sony A7C

DESCRICAO PROFISSIONAL:
A Sony A7C e a mirrorless full-frame mais compacta da Sony, ideal para vloggers e criadores de conteudo que precisam de qualidade profissional num corpo leve e pequeno. Com sensor de 24MP e video 4K HDR, entrega o melhor dos dois mundos.

O autofoco Eye AF em tempo real mantem o foco em olhos humanos e animais, perfeito para retratos e conteudos com pessoas.

Ideal para: Vloggers, YouTubers, criadores de conteudo movel e fotografos de viagem.

ESPECIFICACOES TECNICAS:
Sensor: Full-frame 24MP
Video: 4K HDR
Autofoco: Eye AF rapido
Estabilizacao: IBIS 5 eixos
Bateria: NP-FZ100 (grande autonomia)
Peso: 509g
Cor: Preto
Conectividade: Wi-Fi, Bluetooth

DESTAQUES:
Full-frame compacto (509g)
Ecra articulavel para selfies
Autofoco Eye AF para humanos/animais
IBIS 5 eixos
Bateria de longa duracao

PRECO (MZN): 140.000 MZN`,
    price: 140000,
    category: 'eletronicos',
    image: 'https://cdn.vjshop.vn/may-anh/mirrorless/sony/sony-alpha-a7c/sony-a7c-black-1.jpg',
    brand: 'Sony',
    stock: 10
  },

  {
    name: 'Sony A6600',
    description: `Sony A6600

DESCRICAO PROFISSIONAL:
A Sony A6600 e a mirrorless APS-C topo de gama da Sony, oferecendo video 4K sem limite de tempo e bateria de alta duracao. E a escolha ideal para criadores de conteudo que preferem o formato APS-C (mais compacto e economico).

Com Eye AF em tempo real para humanos e animais, captura momentos perfeitos sem preocupacao com foco.

Ideal para: Criadores de conteudo, YouTubers, fotografos de viagem e quem quer qualidade profissional com lentes mais acessiveis.

ESPECIFICACOES TECNICAS:
Sensor: APS-C 24.2MP
Video: 4K sem limite de tempo
Autofoco: Eye AF em tempo real
Estabilizacao: IBIS integrado
Bateria: NP-FZ100 (alta duracao)
Peso: 503g
Conectividade: Wi-Fi, Bluetooth

DESTAQUES:
Video 4K sem limite de tempo
Bateria de alta duracao (NP-FZ100)
Autofoco Eye AF para humanos/animais
Estabilizacao IBIS integrada
Leve e compacta (503g)

PRECO (MZN): 105.000 MZN`,
    price: 105000,
    category: 'eletronicos',
    image: 'https://m.media-amazon.com/images/I/71S46KIWZSL._UF894,1000_QL80_.jpg',
    brand: 'Sony',
    stock: 10
  },

  {
    name: 'Sony A7R IV',
    description: `Sony A7R IV

DESCRICAO PROFISSIONAL:
A Sony A7R IV e a camara com a maior resolucao no segmento mirrorless full-frame: impressionantes 61 megapixels. Ideal para fotografia comercial, moda, publicidade e paisagens onde cada detalhe conta.

Permite recortes extremos sem perda significativa de qualidade, essencial para fotografos de produtos e arquitetura.

Ideal para: Fotografos de estudo, moda, publicidade, arquitetura e profissionais que precisam de maxima resolucao.

ESPECIFICACOES TECNICAS:
Sensor: Full-frame 61MP
Video: 4K
Autofoco: 567 pontos
Processador: BIONZ X
Bateria: NP-FZ100
Peso: 665g
Estabilizacao: IBIS 5 eixos

DESTAQUES:
Sensor 61MP (resolucao extrema)
Ideal para recortes e ampliacoes
Autofoco de 567 pontos
IBIS 5 eixos
Construcao robusta a prova de poeira

PRECO (MZN): 185.000 MZN`,
    price: 185000,
    category: 'eletronicos',
    image: 'https://m.media-amazon.com/images/I/71qre0hvi6L.jpg',
    brand: 'Sony',
    stock: 10
  },

  {
    name: 'Bose QuietComfort 45 Headphones',
    description: `Bose QuietComfort 45

DESCRICAO PROFISSIONAL:
Os Bose QuietComfort 45 sao a referencia da Bose em conforto e cancelamento de ruido. Com design ergonomico e almofadas em couro sintetico macio, permitem horas de uso sem qualquer desconforto.

O som e equilibrado e natural, com graves presentes mas sem exageros, ideal para todos os generos musicais.

Ideal para: Viajantes frequentes, profissionais, estudantes e quem preza conforto acima de tudo.

ESPECIFICACOES TECNICAS:
Tipo: Over-ear
Cancelamento: ANC
Bateria: ate 24 horas
Carregamento: USB-C, 15 min = 3h uso
Bluetooth: 5.1
Drivers: 40mm
Peso: 240g

DESTAQUES:
Conforto extremo (best-in-class)
Cancelamento de ruido premium
Bateria de 24 horas com carga rapida
Som equilibrado e natural
Design premium e durave

PRECO (MZN): 28.000 MZN`,
    price: 28000,
    category: 'eletronicos',
    image: 'https://cdn.nguyenkimmall.com/images/detailed/848/10054167-tai-nghe-khong-day-bose-quietcomfort-45-den-866724-0100-1.jpg',
    brand: 'Bose',
    stock: 100
  },

  {
    name: 'Bose Noise Cancelling Headphones 700',
    description: `Bose Noise Cancelling Headphones 700

DESCRICAO PROFISSIONAL:
Os Bose NC 700 sao os headphones premium da Bose com design moderno e sistema de cancelamento de ruido ajustavel em 11 niveis. Sao especialmente otimizados para chamadas de voz, com microfonos avancados que isolam a sua voz do ruido ambiente.

O design minimalista em aco inoxidavel escovado confere um aspeto elegante e profissional.

Ideal para: Profissionais que fazem muitas chamadas, trabalhadores remotos, executivos e viajantes frequentes.

ESPECIFICACOES TECNICAS:
Tipo: Over-ear
ANC: 11 niveis ajustaveis
Bateria: ate 20 horas
Bluetooth: 5.0
Microfones: Sistema avancado para chamadas
Peso: 250g
Design: Aco inoxidavel escovado

DESTAQUES:
ANC ajustavel (11 niveis)
Microfones premium para chamadas
Design sofisticado em aco inox
Conforto excecional
Ideal para home office

PRECO (MZN): 30.000 MZN`,
    price: 30000,
    category: 'eletronicos',
    image: 'https://m.media-amazon.com/images/I/51ovuAC+fML._UF894,1000_QL80_.jpg',
    brand: 'Bose',
    stock: 100
  },

  {
    name: 'Bose SoundLink Revolve+ Bluetooth Speaker',
    description: `Bose SoundLink Revolve+ Bluetooth Speaker

DESCRICAO PROFISSIONAL:
A Bose SoundLink Revolve+ e a coluna Bluetooth portatil que proporciona som verdadeiramente 360°, ideal para festas, piqueniques e uso em exteriores. O design cilindrico e a alca de transporte facilitam a mobilidade.

Com resistencia a respingos (IPX4), pode ser usada a beira da piscina ou em ambientes humidos sem preocupacoes.

Ideal para: Festas, encontros ao ar livre, piqueniques, praia e uso domestico versatil.

ESPECIFICACOES TECNICAS:
Som: 360°
Bateria: ate 16 horas
Resistencia: IPX4 (respingos)
Bluetooth: Sim (emparelhamento com 2 dispositivos)
Microfone: Para chamadas
Peso: 0.9kg

DESTAQUES:
Som 360° (cobre todo o ambiente)
Bateria de 16 horas
Resistente a respingos (IPX4)
Design cilindrico com alca
Ideal para exteriores

PRECO (MZN): 18.000 MZN`,
    price: 18000,
    category: 'eletronicos',
    image: 'https://m.media-amazon.com/images/I/61mkO-GAIaL.jpg',
    brand: 'Bose',
    stock: 100
  },

  {
    name: 'Bose SoundSport Free Wireless Earbuds',
    description: `Bose SoundSport Free Wireless Earbuds

DESCRICAO PROFISSIONAL:
Os Bose SoundSport Free sao os earbuds true wireless da Bose projetados para desporto e atividades fisicas. O design com StayHear Max Tips garante que os earbuds permanecam seguros mesmo durante corridas e treinos intensos.

Resistentes ao suor, permitem treinos intensos sem preocupacoes. O estojo de carregamento portatil oferece carga extra para ate 10 horas de uso total.

Ideal para: Desportistas, corredores, entusiastas de fitness e quem precisa de earbuds seguros para actividades fisicas.

ESPECIFICACOES TECNICAS:
Tipo: True Wireless
Resistencia: Suor e respingos
Bateria: 5h + 5h (estojo) = 10h totais
Bluetooth: Sim
Peso: 14g cada (aprox.)
Microfone: Para chamadas

DESTAQUES:
StayHear Max Tips (fixacao segura)
Resistente a suor (ideal para desporto)
Estojo de carregamento portatil
Som potente e claro
Design compacto e discreto

PRECO (MZN): 12.000 MZN`,
    price: 12000,
    category: 'eletronicos',
    image: 'https://m.media-amazon.com/images/S/aplus-media/sota/6fb5cb83-8f6c-40e0-b439-7090e75a0bd2._CR0,0,800,600_PT0_SX800__.jpg',
    brand: 'Bose',
    stock: 100
  },

  {
    name: 'Apple AirPods Max',
    description: `Apple AirPods Max

DESCRICAO PROFISSIONAL:
Os Apple AirPods Max sao os headphones over-ear de luxo da Apple, combinando design premium em aluminio e aco inoxidavel com a melhor integracao do ecossistema Apple. O som e rico e detalhado, com Audio Espacial dinamico que transforma a experiencia musical.

A coroa digital permite controlar volume, musica e chamadas com precisao.

Ideal para: Utilizadores Apple que querem a melhor integracao, audiofilos e entusiastas de design.

ESPECIFICACOES TECNICAS:
Tipo: Over-ear
ANC: Avancado
Bateria: ate 20 horas
Conectividade: Bluetooth 5.0 + H1 chip
Peso: 385g
Material: Aluminio + aco inox
Extras: Audio espacial, Coroa digital
Cores: Cinza, Prata, Verde, Rosa, Azul

DESTAQUES:
Design premium em aluminio
Audio Espacial dinamico
Integracao perfeita com Apple
Coroa digital para controlo preciso
Qualidade de audio excecional

PRECO (MZN): 42.000 MZN`,
    price: 42000,
    category: 'eletronicos',
    image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/airpods-max-hero-select-202011_FMT_WHH',
    brand: 'Apple',
    stock: 50
  },

  {
    name: 'Apple AirPods Pro (2nd Gen)',
    description: `Apple AirPods Pro (2nd Gen)

DESCRICAO PROFISSIONAL:
Os AirPods Pro (2a geracao) sao os earbuds true wireless mais avancados da Apple, com cancelamento de ruido ate 2x mais potente que a geracao anterior. O chip H2 proporciona processamento de audio avancado e Audio Espacial personalizado.

As pontas em silicone de 4 tamanhos garantem ajuste perfeito e conforto para longas sessoes.

Ideal para: Utilizadores Apple, quem precisa de ANC potente em formato compacto, e amantes de musica em movimento.

ESPECIFICACOES TECNICAS:
Tipo: In-ear, True Wireless
ANC: Ate 2x mais potente
Bateria: 6-30 horas (com estojo)
Chip: H2
Extras: Audio espacial personalizado
Resistencia: IPX4 (suor e agua)
Estojo: MagSafe, USB-C

DESTAQUES:
ANC 2x mais potente que AirPods Pro 1
Chip H2 para processamento avancado
Audio espacial personalizado
Estojo de carregamento MagSafe
Resistencia a suor (IPX4)

PRECO (MZN): 20.000 MZN`,
    price: 20000,
    category: 'eletronicos',
    image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH',
    brand: 'Apple',
    stock: 50
  },

  {
    name: 'Apple Watch Series 7',
    description: `Apple Watch Series 7

DESCRICAO PROFISSIONAL:
O Apple Watch Series 7 e o smartwatch mais avancado da Apple com o maior ecra de sempre e carregamento mais rapido. O ecra Always-On Retina e 70% mais brilhante em ambientes internos.

Com sensores de ECG e oxigenio no sangue (SpO2), monitoriza a sua saude continuamente e pode detetar anomalias.

Ideal para: Utilizadores Apple, entusiastas de fitness, pessoas preocupadas com saude e quem quer um life tracker completo.

ESPECIFICACOES TECNICAS:
Tela: Always-On Retina LTPO OLED
Tamanhos: 41mm / 45mm
Sensores: ECG, SpO2, Cardiaco (3a gen)
Bateria: ate 18 horas
Carregamento: USB-C (33% mais rapido)
Resistencia: 50m + IP6X poeira
Compatibilidade: iPhone
Cores: Meia-noite, Estelar, Verde, Azul, Vermelho

DESTAQUES:
Maior ecra de sempre (+20% area)
Carregamento 33% mais rapido
ECG e SpO2 para saude
Resistencia a poeira (IP6X)
Always-On mais brilhante

PRECO (MZN): 28.000 MZN`,
    price: 28000,
    category: 'eletronicos',
    image: 'https://akbroshop.com/wp-content/uploads/2022/08/hinh-aw-s7-xanh.jpg',
    brand: 'Apple',
    stock: 100
  },

  {
    name: 'Samsung Galaxy Watch 4',
    description: `Samsung Galaxy Watch 4

DESCRICAO PROFISSIONAL:
O Samsung Galaxy Watch 4 e o primeiro smartwatch com Wear OS 3, combinando o melhor da Samsung e Google. Com sensor de bioimpedancia (BIA), oferece medicao de composicao corporal (massa gorda, muscular, agua, etc).

O ecra Super AMOLED de 1.4 polegadas e vibrante e facil de ler sob luz solar.

Ideal para: Utilizadores Android/Samsung, entusiastas de fitness, pessoas que monitorizam saude/composicao corporal.

ESPECIFICACOES TECNICAS:
Tela: 1.4" Super AMOLED (360x360)
Sensores: ECG, Bioimpedancia (BIA), Cardiaco
Chip: Exynos W920
RAM: 1.5GB
Storage: 16GB
Bateria: 361mAh (ate 40h)
OS: Wear OS 3
Resistencia: 5ATM + IP68

DESTAQUES:
Sensor de composicao corporal (BIA)
Ecossistema Samsung + Google (Wear OS 3)
Ecra Super AMOLED vibrante
ECG para monitorizacao cardiaca
Primeiro Wear OS 3 do mercado

PRECO (MZN): 12.000 MZN`,
    price: 12000,
    category: 'eletronicos',
    image: 'https://cdn-v2.didongviet.vn/files/media/catalog/product/s/a/samsung-galaxy-watch-4-40mm-likenew-mau-den-didongviet.jpeg',
    brand: 'Samsung',
    stock: 100
  },

  {
    name: 'Samsung Galaxy Watch Active2',
    description: `Samsung Galaxy Watch Active2

DESCRICAO PROFISSIONAL:
O Samsung Galaxy Watch Active2 e o smartwatch desportivo da Samsung com ecra Super AMOLED touch (borda sensivel ao toque). Focado em fitness e saude, oferece monitorizacao cardiaca continua e GPS integrado para rastreio de corridas.

Design leve e minimalista.

Ideal para: Atletas amadores, entusiastas de fitness, corredores e caminhantes.

ESPECIFICACOES TECNICAS:
Tela: 1.4" Super AMOLED (touch bezel)
Sensores: Cardiaco, GPS, Acelerometro, Giroscopio
Bateria: 2-3 dias (tipico)
Resistencia: 5ATM (50m)
Tamanhos: 40mm / 44mm
Cores: Preto, Prata, Ouro
OS: Tizen

DESTAQUES:
Touch bezel (borda sensivel ao toque)
GPS integrado sem telefone
Leve e confortavel para uso diario
Monitorizacao cardiaca continua
Design minimalista e elegante

PRECO (MZN): 10.000 MZN`,
    price: 10000,
    category: 'eletronicos',
    image: 'https://image-us.samsung.com/SamsungUS/home/mobile/wearables/pdp/sm-r820nzkaxar/Gallery-Active2-BT-44mm-AquaBlack-1.jpg',
    brand: 'Samsung',
    stock: 100
  },

  {
    name: 'Canon EOS R5',
    description: `Canon EOS R5

DESCRICAO PROFISSIONAL:
A Canon EOS R5 e uma camara que redefine o que e possivel no mundo da fotografia e video profissional. Com sensor full-frame de 45 megapixels e gravacao de video 8K RAW, e uma ferramenta de criacao para cineastas e fotografos mais exigentes.

O sistema de autofoco Dual Pixel AF II da Canon oferece 1053 pontos de focagem automatica com seguimento de olhos, rosto e corpo para humanos, animais e passaros, mesmo em condicoes de pouca luz.

Ideal para: Fotografos profissionais, videografos comerciais, criadores de conteudo cinematografico e amadores avancados.

ESPECIFICACOES TECNICAS:
Sensor: Full-frame CMOS 45MP
Video: 8K RAW, 4K 120fps
Processador: DIGIC X
Autofoco: Dual Pixel AF II (1053 pontos)
Estabilizacao: IBIS 5 eixos (8 stops)
ISO: 100-51200 (50-102400)
Burst: 20 fps
Bateria: LP-E6NH
Peso: 738g

DESTAQUES:
Video 8K RAW (cinema profissional)
Sensor 45 megapixels (resolucao extrema)
IBIS 8 stops (melhor da categoria)
Autofoco com deteccao de olhos para animais/passaros
Dual DIGIC X (processamento topo)

PRECO (MZN): 200.000 MZN`,
    price: 200000,
    category: 'eletronicos',
    image: 'https://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_square_32c26ad194234d42b3cd9e582a21c99b',
    brand: 'Canon',
    stock: 5
  },

  {
    name: 'Canon EOS R6',
    description: `Canon EOS R6

DESCRICAO PROFISSIONAL:
A Canon EOS R6 e a camara equilibrada da Canon para profissionais que precisam de excelente qualidade em baixa luz e video 4K 60fps. Com sensor de 20MP, o ruido em ISO elevados e significativamente reduzido.

O sistema Dual Pixel AF II com seguimento de olhos e extremamente rapido e preciso.

Ideal para: Fotografos de casamentos e eventos, videografos e criadores de conteudo versatil.

ESPECIFICACOES TECNICAS:
Sensor: Full-frame CMOS 20MP
Video: 4K 60fps
Processador: DIGIC X
Autofoco: Dual Pixel AF II
Estabilizacao: IBIS 5 eixos (8 stops)
ISO: 100-102400
Burst: 20 fps
Peso: 680g

DESTAQUES:
Excelente performance em baixa luz
Video 4K 60fps profissional
IBIS 8 stops (lider do mercado)
Autofoco Dual Pixel AF II
Melhor custo-beneficio full-frame Canon

PRECO (MZN): 165.000 MZN`,
    price: 165000,
    category: 'eletronicos',
    image: 'https://cdn.vjshop.vn/may-anh/mirrorless/canon/canon-eos-r6/canon-eos-r6-1-1500x1500.jpg',
    brand: 'Canon',
    stock: 5
  },

  {
    name: 'Canon EOS M50 Mark II',
    description: `Canon EOS M50 Mark II

DESCRICAO PROFISSIONAL:
A Canon EOS M50 Mark II e a camara ideal para criadores de conteudo do YouTube e vloggers. Com tela totalmente articulavel e autofoco Dual Pixel AF, e perfeita para selfies e gravacao.

O sensor APS-C de 24MP oferece qualidade profissional num corpo compacto e leve.

Ideal para: YouTubers, vloggers, criadores de conteudo iniciantes e amantes de fotografia casual.

ESPECIFICACOES TECNICAS:
Sensor: APS-C 24MP
Video: 4K
Autofoco: Dual Pixel AF
Tela: 3" articulavel touch
Peso: 387g
Conectividade: Wi-Fi, Bluetooth
Entrada: Microfone externo

DESTAQUES:
Tela articulavel (vlogging perfeito)
Autofoco Dual Pixel AF
Compacta e leve (387g)
Excelente para YouTube/Instagram
Entrada para microfone externo

PRECO (MZN): 55.000 MZN`,
    price: 55000,
    category: 'eletronicos',
    image: 'https://cdn.media.amplience.net/i/canon/eos-m50-mark-ii-black-the-front-m15-45_gallery-images_04_06baea4af09f4197afef103303f8ffac',
    brand: 'Canon',
    stock: 5
  },

  {
    name: 'LG C1 OLED TV',
    description: `LG C1 OLED TV

DESCRICAO PROFISSIONAL:
A LG C1 OLED TV oferece qualidade cinematografica com pretos perfeitos e contraste infinito. A tecnologia OLED (diodos organicos auto-emissores) permite que cada pixel seja controlado individualmente, resultando em imagens de realismo impressionante.

O processador α9 Gen 4 AI utiliza inteligencia artificial para melhorar imagem e som em tempo real.

Ideal para: Cinefilos, gamers, entusiastas de home theater e quem procura a melhor qualidade de imagem disponivel.

ESPECIFICACOES TECNICAS:
Tela: OLED 4K
Taxa: 120Hz
Gaming: NVIDIA G-SYNC, AMD FreeSync, VRR, ALLM
Audio: Dolby Atmos
Processador: α9 Gen 4 AI
Tamanhos: 48/55/65/77/83"

DESTAQUES:
Pretos perfeitos (OLED)
120Hz + G-SYNC + FreeSync (gamer)
Dolby Vision IQ + Dolby Atmos
Processador α9 Gen 4 com AI
Design ultra-fino (LG Gallery Design)

PRECO (MZN): 120.000 MZN`,
    price: 120000,
    category: 'eletronicos',
    image: 'https://product.hstatic.net/200000574527/product/dz-6_ac9672a6534245fcbb1a4938a1337907_1024x1024.jpg',
    brand: 'LG',
    stock: 15
  },

  {
    name: 'LG OLED C1 Series TV',
    description: `LG OLED C1 Series TV

DESCRICAO PROFISSIONAL:
A LG OLED C1 Series e a familia de TVs OLED mais famosa da LG, disponivel em multiplos tamanhos (48 a 83 polegadas). Oferece a mesma qualidade OLED com pretos perfeitos e resposta instantanea, ideal para cinema e gaming.

O Magic Remote com pointer e uma forma intuitiva de controlar a TV.

Ideal para: Tamanhos variados de sala, desde quartos pequenos a salas de estar grandes.

ESPECIFICACOES TECNICAS:
Tela: OLED 4K
Taxa: 120Hz
Gaming: NVIDIA G-SYNC, AMD FreeSync, VRR
Audio: Dolby Atmos
Tamanhos: 48/55/65/77/83"
Game Optimizer: Dashboard para ajustes gaming

DESTAQUES:
Disponivel em 5 tamanhos
OLED com pretos perfeitos
HDMI 2.1 para gaming
Magic Remote com pointer
Processador α9 Gen 4 AI

PRECO (MZN): 120.000 MZN`,
    price: 120000,
    category: 'eletronicos',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOCLMqp7pz0tLjKm2tCeJOeJ2EJ5Y5kkmf2w&s',
    brand: 'LG',
    stock: 15
  },

  {
    name: 'GoPro Hero 10 Black',
    description: `GoPro Hero 10 Black

DESCRICAO PROFISSIONAL:
A GoPro Hero 10 Black e a action cam mais avancada da GoPro, com o novo processador GP2 que permite video 5.3K 60fps e fotos de 23MP. A estabilizacao HyperSmooth 4.0 e tao eficaz que muitas vezes dispensa o uso de gimbals.

Com resistencia a 10m sem caixa, pode ser usada em praia, piscina e ate mergulho leve.

Ideal para: Aventureiros, viajantes, desportistas, vloggers de acao e criadores de conteudo outdoor.

ESPECIFICACOES TECNICAS:
Video: 5.3K 60fps, 4K 120fps
Foto: 23MP
Processador: GP2
Estabilizacao: HyperSmooth 4.0
Resistencia: 10m (sem caixa)
Tela: 2.27" touch (traseira) + 1.4" (frontal)
Bateria: 1720mAh
Conectividade: Wi-Fi, Bluetooth, GPS

DESTAQUES:
Video 5.3K 60fps (qualidade cinema)
HyperSmooth 4.0 (estabilizacao lider)
Resistente a 10m sem caixa
Tela frontal para selfies/vlogs
Processador GP2 (2x mais rapido)

PRECO (MZN): 25.000 MZN`,
    price: 25000,
    category: 'eletronicos',
    image: 'https://cdn.vjshop.vn/camera-hanh-dong/gopro/gopro-hero-10/gopro-hero-10-1000x1000.png',
    brand: 'GoPro',
    stock: 50
  },

  {
    name: 'GoPro Hero 9 Black',
    description: `GoPro Hero 9 Black

DESCRICAO PROFISSIONAL:
A GoPro Hero 9 Black introduziu o ecra frontal a cores, essencial para vloggers e selfies. Com video 5K e estabilizacao HyperSmooth 3.0, captura momentos de acao com qualidade profissional.

A bateria de maior duracao (1720mAh) permite gravacoes mais longas.

Ideal para: Criadores de conteudo de acao, vloggers, viajantes e desportistas.

ESPECIFICACOES TECNICAS:
Video: 5K 30fps
Foto: 20MP
Estabilizacao: HyperSmooth 3.0
Resistencia: 10m (sem caixa)
Tela: Frontal a cores + Traseira touch
Bateria: 1720mAh (maior capacidade)

DESTAQUES:
Ecra frontal a cores (selfies/vlogs)
Video 5K de alta qualidade
HyperSmooth 3.0 (boa estabilizacao)
Bateria de maior duracao
Ideal para criadores de conteudo

PRECO (MZN): 20.000 MZN`,
    price: 20000,
    category: 'eletronicos',
    image: 'https://m.media-amazon.com/images/I/513QgYmBUrL._UF894,1000_QL80_.jpg',
    brand: 'GoPro',
    stock: 50
  },

  {
    name: 'GoPro Hero 8 Black',
    description: `GoPro Hero 8 Black

DESCRICAO PROFISSIONAL:
A GoPro Hero 8 Black e a action cam que introduziu as "folding fingers" (pes dobradores), eliminando a necessidade de caixa para montagem. Com video 4K 60fps e HyperSmooth 2.0, oferece boa estabilizacao sem acessorios.

Design mais compacto e leve.

Ideal para: Quer entrar no mundo GoPro com excelente qualidade sem gastar muito.

ESPECIFICACOES TECNICAS:
Video: 4K 60fps
Foto: 12MP
Estabilizacao: HyperSmooth 2.0
Resistencia: 10m (sem caixa)
Folding fingers: Pes dobradores integrados
Peso: 126g (mais leve)

DESTAQUES:
Pes dobradores (sem caixa para montagem)
HyperSmooth 2.0 (boa estabilizacao)
Design compacto e leve (126g)
4K 60fps (qualidade profissional)
Melhor custo-beneficio GoPro

PRECO (MZN): 16.000 MZN`,
    price: 16000,
    category: 'eletronicos',
    image: 'https://m.media-amazon.com/images/I/61oRRIabmZL.jpg',
    brand: 'GoPro',
    stock: 50
  },

  {
    name: 'DJI Mavic Air 2',
    description: `DJI Mavic Air 2

DESCRICAO PROFISSIONAL:
O DJI Mavic Air 2 e um drone compacto mas poderoso, com video 4K 60fps e sensor de 48MP. Com ate 34 minutos de tempo de voo e alcance de 10km, e uma ferramenta profissional para fotografia aerea e video.

A tecnologia OcuSync 2.0 oferece transmissao de video ate 10km com qualidade 1080p.

Ideal para: Fotografos aereos, cineastas, topografos, agricultores e entusiastas de drones.

ESPECIFICACOES TECNICAS:
Video: 4K 60fps
Foto: 48MP (Quad Bayer)
Tempo de voo: ate 34 minutos
Alcance: 10km (OcuSync 2.0)
Estabilizacao: Gimbal 3 eixos
Resistencia: Nivel 5 de vento
Peso: 570g

DESTAQUES:
Video 4K 60fps (suave e detalhado)
34 minutos de voo (lider no segmento)
Alcance de 10km (OcuSync 2.0)
Sensor de 48MP para fotos detalhadas
Gimbal 3 eixos para estabilizacao

PRECO (MZN): 60.000 MZN`,
    price: 60000,
    category: 'eletronicos',
    image: 'https://se-cdn.djiits.com/tpc/uploads/carousel/image/36686a09675382bfb57d7d12a3a1165f@ultra.jpg',
    brand: 'DJI',
    stock: 50
  },

  {
    name: 'DJI Osmo Pocket 2',
    description: `DJI Osmo Pocket 2

DESCRICAO PROFISSIONAL:
O DJI Osmo Pocket 2 e o gimbal portatil mais compacto do mercado, com camara integrada que grava 4K e gimbal de 3 eixos para estabilizacao perfeita. Cabe no seu bolso e oferece qualidade de cinema.

Ideal para: Vloggers, viajantes, criadores de conteudo movel e qualquer pessoa que queira videos estaveis sem equipamento pesado.

ESPECIFICACOES TECNICAS:
Video: 4K
Estabilizacao: Gimbal 3 eixos
Tecnologia: DJI Matrix
Peso: 117g
Audio: Microfone direcional integrado
Conectividade: Wi-Fi, Bluetooth

DESTAQUES:
Ultra compacto (117g)
Gimbal 3 eixos (estabilizacao profissional)
4K para videos de alta qualidade
Ideal para vloggers e viajantes
Microfone direcional incluido

PRECO (MZN): 28.000 MZN`,
    price: 28000,
    category: 'eletronicos',
    image: 'https://se-cdn.djiits.com/tpc/uploads/carousel/image/8882692311e107b9f4f490d774ca43eb@ultra.jpg',
    brand: 'DJI',
    stock: 50
  },

  {
    name: 'Samsung Galaxy Buds Pro',
    description: `Samsung Galaxy Buds Pro

DESCRICAO PROFISSIONAL:
Os Samsung Galaxy Buds Pro sao os earbuds true wireless topo de gama da Samsung, com cancelamento de ruido inteligente e resistencia IPX7 (submersiveis ate 1 metro). O som e assinado pela AKG.

Oferecem audio espacial 360° e integracao perfeita com o ecossistema Samsung.

Ideal para: Utilizadores Samsung, audiofilos exigentes, desportistas e quem precisa de ANC potente.

ESPECIFICACOES TECNICAS:
Tipo: In-ear, True Wireless
ANC: Inteligente (ajusta automatico)
Bateria: 5-18 horas (com estojo)
Codecs: SSC (Samsung Seamless), AAC
Resistencia: IPX7 (submersivel 1m)
Audio: 360° Spatial Audio pela AKG
Microfones: 3 por earphone para chamadas

DESTAQUES:
ANC inteligente com ajuste automatico
Resistencia IPX7 (submersivel)
Audio espacial 360°
Integracao com ecossistema Samsung
Som premium pela AKG

PRECO (MZN): 6.500 MZN`,
    price: 6500,
    category: 'eletronicos',
    image: 'https://m.media-amazon.com/images/I/51c8jaXEp+S.jpg',
    brand: 'Samsung',
    stock: 100
  }

];

const seedDB = async ({ force = false, skipIfExists = true } = {}) => {
  const existingCount = await Product.estimatedDocumentCount();

  if (!force && skipIfExists && existingCount > 0) {
    console.log(`Products already exist (count=${existingCount}). Skipping seed.`);
    return { seeded: false, skipped: true, existingCount };
  }

  if (force) {
    await Product.deleteMany({});
    console.log('Existing products deleted.');
  }

  const insertedDocs = await Product.insertMany(productSeeds, { ordered: false });
  console.log(`Products data seeded successfully! Inserted ${insertedDocs.length} records.`);

  return { seeded: true, skipped: false, inserted: insertedDocs.length };
};

if (process.argv[2] == 'dev') {
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
  mongoose.connect(process.env.MONGO_URI, {}).then(async () => {
    await seedDB({ force: true, skipIfExists: false });
    process.exit();
  });
}

module.exports = seedDB;