CREATE DATABASE  IF NOT EXISTS `user` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `user`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: user
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chat_data`
--

DROP TABLE IF EXISTS `chat_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_data` (
  `chat_id` int NOT NULL AUTO_INCREMENT,
  `chatroom_id` int DEFAULT NULL,
  `query` text NOT NULL,
  `response` text NOT NULL,
  PRIMARY KEY (`chat_id`),
  KEY `chatroom_id` (`chatroom_id`),
  CONSTRAINT `chat_data_ibfk_1` FOREIGN KEY (`chatroom_id`) REFERENCES `chatroom_data` (`chatroom_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_data`
--

LOCK TABLES `chat_data` WRITE;
/*!40000 ALTER TABLE `chat_data` DISABLE KEYS */;
INSERT INTO `chat_data` VALUES (76,50,'Commercial Courts Act','## Summary of Commercial Courts Acts & Rules: A Commercial Courts Chat Engine Perspective\n\n**User:** I\'m seeking information on the Commercial Courts Act and how it affects trademark disputes.\n\n**Chat Engine:**  As a commercial courts chat engine, I can provide you with a legal breakdown of the Commercial Courts Act and its relevance to trademark cases. \n\n**The Commercial Courts Act (CCA) and Trademark Disputes:**\n\nThe CCA, along with the Commercial Courts Rules, 2018, aims to streamline and expedite commercial disputes, including those involving trademarks. It achieves this by:\n\n* **Specialized Courts:** Establishing dedicated commercial courts for faster adjudication of commercial matters.\n* **Promoting Mediation:** Emphasizing mediation as a pre-litigation dispute resolution tool, particularly relevant in trademark cases.\n\n**Key Considerations for Trademark Disputes:**\n\n* **Mandatory Mediation:** The CCA mandates mediation before a commercial case can be filed. This applies to trademark disputes as well.\n* **Urgent Cases:** While plaintiffs can bypass mediation in urgent cases, this can be challenged in court. The Supreme Court has ruled that urgent interim relief cannot justify avoiding mediation, especially in cases involving falsity or deception.\n* **Challenging Mediation Avoidance:** Defendants in trademark disputes can challenge attempts by plaintiffs to avoid mediation. They can argue that the case doesn\'t meet the criteria for urgency or that the plaintiff is attempting to circumvent the mandatory mediation process.\n\n**Importance of Mediation in Trademark Disputes:**\n\nMediation offers a significant advantage in trademark disputes:\n\n* **Cost-Effective:** It can be significantly cheaper than a full-blown court case.\n* **Flexible:** Allows for creative solutions that may not be available in court.\n* **Preserves Relationships:** Can maintain business relationships that may be strained by litigation.\n\n**Key Takeaway:**\n\nThe CCA significantly impacts trademark disputes by mandating mediation and emphasizing its importance. Plaintiffs must demonstrate genuine urgency to bypass mediation. This approach ensures a fair process and promotes efficient resolution of trademark disputes.\n\n**Disclaimer:** This information is for general knowledge and understanding only. It is not legal advice and should not be considered a substitute for professional legal advice. \n'),(77,50,'Explain more','Okay, let\'s delve deeper into how the Commercial Courts Act (CCA) and its rules impact trademark disputes. \n\n**1.  Specialized Commercial Courts:**\n\n* **Jurisdiction:** The CCA designates specific courts to handle complex commercial matters. This means that trademark disputes are now heard by judges with expertise in commercial law, leading to more informed and efficient decisions.\n* **Expedited Proceedings:** These courts are designed to expedite proceedings. This translates to faster resolution of trademark disputes, reducing costs and uncertainty for businesses.\n\n**2.  Mandatory Mediation:**\n\n* **Pre-Filing Mediation:** The CCA requires parties to attempt mediation *before* filing a lawsuit. This applies to all commercial disputes, including trademark cases.  \n* **The \"Good Faith\" Requirement:** The mediation process must be undertaken in good faith, with both sides genuinely trying to reach a settlement. \n* **Mediation Committees:**  The CCA establishes specialized mediation committees that can help parties find suitable mediators with expertise in trademark disputes.\n\n**3.  Urgency and Bypassing Mediation:**\n\n* **Limited Exceptions:**  The CCA allows for exceptions to mandatory mediation in urgent cases. These exceptions are strictly defined and must be justified by the plaintiff.\n* **Supreme Court Guidance:** The Supreme Court has clarified that urgency alone is not enough to bypass mediation. The nature of the dispute, potential harm, and the likelihood of success in court are crucial considerations.\n* **Defendant\'s Rights:** The defendant in a trademark dispute has the right to challenge a plaintiff\'s claim of urgency and argue for mediation.\n\n**4.  Benefits of Mediation in Trademark Disputes:**\n\n* **Flexibility:** Mediation provides a more flexible framework for resolving trademark disputes than litigation. Parties can explore a wider range of solutions, including:\n    * License agreements\n    * Co-existence agreements\n    * Financial settlements\n* **Cost-Effectiveness:** Mediation is generally less expensive than litigation, saving both sides money on legal fees and court costs.\n* **Confidentiality:**  Mediation proceedings are confidential, which can be important for preserving business relationships.\n* **Focus on Solutions:** Mediation encourages a collaborative approach, focusing on finding solutions that address both parties\' interests.\n\n**5.  The Impact on Trademark Holders:**\n\n* **Early Dispute Resolution:**  The CCA encourages early resolution of trademark disputes, which can be beneficial for businesses seeking to protect their brands.\n* **Minimizing Costs:** Mediation can help trademark holders avoid costly and time-consuming litigation.\n* **Strategic Advantages:** Trademark holders can use mediation to achieve their desired outcomes, such as securing a favorable settlement or avoiding a potentially adverse court ruling.\n\n**Remember:** The CCA and its rules have significantly changed the landscape of trademark disputes in India. Understanding the process and the benefits of mediation can help businesses navigate these challenges effectively. \n'),(78,51,'Trade Laws in India','## Analysis of \"Summary of Trade Agreements in India\" from a Commercial Court Perspective\n\nThis summary provides a valuable overview of India\'s trade agreements, highlighting its commitment to expanding its trade relationships. However, from a commercial court perspective, certain aspects require further consideration and analysis. \n\n**1. Legal Framework and Enforcement:**\n\n* **Specificity of Agreement Provisions:** The summary focuses on the existence of agreements but lacks detail on the specific provisions within each agreement. This is crucial for commercial courts as these provisions define the legal framework for disputes arising from trade transactions. For example, detailed information on dispute resolution mechanisms, customs duties, and rules of origin is critical for effective legal interpretation and enforcement.\n* **Implementation and Compliance:** The document mentions India\'s commitment to the WTO and adherence to trade regulations. This needs to be substantiated with details about the specific mechanisms and institutions responsible for implementing these agreements and ensuring compliance. This includes information on the role of the Indian customs department, trade tribunals, and relevant government agencies in enforcing trade agreements. \n* **Impact on Domestic Laws:**  Commercial courts need to understand how trade agreements affect India\'s domestic laws. For example, do trade agreements create specific exceptions or override existing domestic legislation? A detailed analysis of this interplay is necessary for consistent and impartial adjudication of commercial disputes arising from trade transactions.\n\n**2. Trade Disputes and Legal Remedies:**\n\n* **Dispute Resolution Mechanisms:** The summary mentions ongoing negotiations with countries like the US and Australia.  It\'s critical to know whether these negotiations include detailed dispute resolution clauses. Commercial courts are likely to handle disputes arising from these agreements, and understanding the pre-defined dispute settlement procedures is essential for efficient resolution.\n* **International Arbitration:**  The document should mention the prominence of international arbitration in resolving trade disputes. Commercial courts often need to interpret and enforce arbitration awards arising from trade agreements, making it crucial to understand the legal framework governing these awards and the role of Indian courts in this process. \n* **Jurisdiction and Enforcement of Foreign Judgments:** The summary should shed light on the process for enforcing judgments from foreign courts related to trade agreements in India.  This is vital for ensuring predictability and stability in cross-border commercial transactions.\n\n**3. Impact on Businesses and Trade:**\n\n* **Impact on Business Operations:** The document mentions the benefits of trade agreements for India\'s export markets.  However, a detailed analysis of how these agreements affect specific industries, businesses, and their operations is necessary. This includes understanding the impact on sourcing, production, pricing, and competition.\n* **Trade Facilitation and Market Access:** The summary should delve into the specific measures adopted to facilitate trade and improve market access. This includes examining measures like customs simplification, streamlined procedures, and information sharing mechanisms. \n\n**Recommendations:**\n\n* **Expand the scope to include a comprehensive legal analysis of each trade agreement, emphasizing provisions relevant to commercial courts.**\n* **Provide a detailed overview of the institutional framework for implementing and enforcing trade agreements in India.**\n* **Analyze the impact of trade agreements on Indian businesses, domestic laws, and the commercial court system.**\n\nBy incorporating this deeper legal analysis, the summary can serve as a valuable resource for commercial courts, businesses, and legal professionals involved in trade-related disputes in India. \n'),(79,51,'What is custom duty tax?','**Custom Duty Tax** is a tax levied on goods that are imported into or exported from a country. It is a type of tariff, which is a tax imposed on goods traded internationally.\n\nHere\'s a breakdown:\n\n* **Purpose:** The primary purpose of custom duty tax is to generate revenue for the government, protect domestic industries from foreign competition, and control the flow of goods into and out of a country. \n* **How it works:** Custom duty tax is calculated as a percentage of the value of the goods being imported or exported. The rate of duty varies depending on the type of goods, the country of origin, and the specific trade agreements in place.\n* **Types:** There are different types of custom duty taxes, including:\n    * **Ad valorem duty:** This is a percentage of the value of the goods.\n    * **Specific duty:** This is a fixed amount of money per unit of goods.\n    * **Compound duty:** This combines both ad valorem and specific duties.\n* **Exemptions:** Certain goods may be exempt from custom duty tax, such as essential goods, humanitarian aid, or goods used for specific purposes like scientific research.\n\n**Impact on Businesses:**\n\nCustom duty tax can have a significant impact on businesses involved in international trade. It can increase the cost of imported goods, making them less competitive in the domestic market. Businesses may also need to navigate complex customs regulations and procedures to ensure they are paying the correct amount of duty.\n\n**Example:** \n\nImagine a company importing electronics from China.  The goods are valued at $10,000, and the custom duty tax rate is 10%. The company would need to pay $1,000 in custom duty tax before the goods can enter the country. \n\nUnderstanding custom duty tax is essential for businesses engaging in international trade, as it can have a direct impact on their profitability and overall operations. \n'),(80,51,'Explain more','Okay, I can explain more about custom duty tax.  Let\'s break down the key points, adding more detail and examples to help you understand:\n\n**1.  The Basics of Custom Duty Tax:**\n\n* **Who Pays?**  Importers pay custom duty tax. This means if you\'re bringing goods into India from another country, you\'ll be responsible for paying this tax.\n* **Purpose (Why It Exists):** \n    * **Revenue Generation:**  Government\'s need money to fund public services like healthcare, education, infrastructure, etc. Custom duty tax is a way to bring in revenue.\n    * **Protection of Domestic Industries:**  Imagine a local shoemaker in India. They might have to compete with cheaper shoes imported from another country. Custom duty can make those imported shoes more expensive, giving the local shoemaker a better chance to compete.\n    * **Control Over Trade:**  Governments use custom duties to regulate which goods are allowed into the country and to discourage the import of harmful or illegal products.\n\n**2.  How is Custom Duty Tax Calculated?**\n\n* **Value of the Goods:**  The first step is determining the value of the goods being imported. This can be the price paid for the goods, but it can also include things like shipping costs, insurance, and other associated expenses.\n* **Duty Rate:**  The custom duty rate is set by the Indian government and depends on the type of goods being imported. This rate can vary greatly. Some items might have a very low duty rate (like medicine or educational materials), while others might have a higher rate (luxury goods, for example).\n* **Example:**  Imagine you import 100 laptops from the US, each worth $500. The total value is $50,000. If the custom duty rate on laptops is 15%, you\'d pay: $50,000 * 0.15 = $7,500 in custom duty tax.\n\n**3.  Types of Custom Duty Tax:**\n\n* **Ad Valorem:**  This is a percentage of the value of the goods. The example above was an ad valorem duty.\n* **Specific Duty:**  This is a fixed amount of money per unit of goods.  For example, a specific duty might be $5 per kilogram of sugar imported.\n* **Compound Duty:**  This combines both ad valorem and specific duties.  So, you might pay a percentage of the value AND a fixed amount per unit of goods.\n\n**4.  Exemptions:**\n\n* **Essential Goods:**  These are goods considered vital for everyday life, like food or medicine.\n* **Humanitarian Aid:**  Goods donated for disaster relief or other humanitarian purposes.\n* **Scientific Research:**  Equipment and materials used for scientific research may be exempt.\n* **Trade Agreements:**  India might have agreements with other countries where certain goods are imported duty-free. \n\n**5.  Impact on Businesses:**\n\n* **Increased Costs:** Custom duty can make imported goods more expensive, potentially reducing their competitiveness in the domestic market.\n* **Complexity:**  Understanding and complying with the complex customs rules and regulations can be a challenge for businesses. \n* **Planning and Forecasting:**  Businesses need to factor in potential custom duty costs when planning their import and export activities.  This can impact pricing decisions, profitability, and overall business strategy.\n\n**In Summary:**\n\nCustom duty tax is a crucial element of international trade in India. Understanding how it works, its different types, and its potential impact on your business is essential for success. \n');
/*!40000 ALTER TABLE `chat_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatroom_data`
--

DROP TABLE IF EXISTS `chatroom_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatroom_data` (
  `chatroom_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`chatroom_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `chatroom_data_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatroom_data`
--

LOCK TABLES `chatroom_data` WRITE;
/*!40000 ALTER TABLE `chatroom_data` DISABLE KEYS */;
INSERT INTO `chatroom_data` VALUES (50,18,'Commercial Courts Act'),(51,18,'Trade Laws in India');
/*!40000 ALTER TABLE `chatroom_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `decision_data`
--

DROP TABLE IF EXISTS `decision_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `decision_data` (
  `decision_id` int NOT NULL AUTO_INCREMENT,
  `decisionroom_id` int DEFAULT NULL,
  `query` text NOT NULL,
  `response` text NOT NULL,
  PRIMARY KEY (`decision_id`),
  KEY `decisionroom_id` (`decisionroom_id`),
  CONSTRAINT `decision_data_ibfk_1` FOREIGN KEY (`decisionroom_id`) REFERENCES `decisionroom_data` (`decisionroom_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `decision_data`
--

LOCK TABLES `decision_data` WRITE;
/*!40000 ALTER TABLE `decision_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `decision_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `decisionroom_data`
--

DROP TABLE IF EXISTS `decisionroom_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `decisionroom_data` (
  `decisionroom_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`decisionroom_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `decisionroom_data_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `decisionroom_data`
--

LOCK TABLES `decisionroom_data` WRITE;
/*!40000 ALTER TABLE `decisionroom_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `decisionroom_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doc_data`
--

DROP TABLE IF EXISTS `doc_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doc_data` (
  `doc_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `generated_doc` text,
  PRIMARY KEY (`doc_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `doc_data_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doc_data`
--

LOCK TABLES `doc_data` WRITE;
/*!40000 ALTER TABLE `doc_data` DISABLE KEYS */;
INSERT INTO `doc_data` VALUES (22,18,'## Summary of Research Findings\n**Generated by: Pragati.ai-Research Engine**\n**Date and Time: [Generation Date and Time]**\n\n## Case Reference: Commercial Courts Act\n\n### I. Introduction\n**A. Background of the Case:** This research focuses on the Commercial Courts Act (CCA) of 2015 and its impact on commercial disputes, particularly those concerning trademark matters. \n**B. Scope of Research:**  This summary explores the CCA\'s provisions, the accompanying Commercial Courts Rules (2018), and their implications for trademark disputes. It analyzes data from chat interactions, summaries of online resources, and legal precedents.\n\n### II. Summary of Saved Chat Data\n**A. Key Points from Decision Facilitator Engine:** The Decision Facilitator Engine (DFE) highlights the CCA\'s goal to expedite commercial disputes. The DFE emphasizes mediation as a crucial tool for pre-litigation resolution, particularly in trademark cases. \n**B. Relevant User Interactions:** A user query regarding the CCA and its relationship to trademark disputes prompted the DFE to provide a detailed explanation. The user\'s questions revealed a need for clarity regarding the mediation process and its mandatory nature under the CCA.\n**C. Model Consultancy Insights:** The model consultancy emphasized the importance of understanding the CCA\'s provisions for both plaintiffs and defendants in trademark disputes. It highlighted the potential for defendants to challenge plaintiffs\' attempts to circumvent mediation, ensuring fairness and efficiency in the dispute resolution process.\n\n### III. Analysis of Saved Summary Data\n**A. Overview of Summary Results:** The saved summary data confirms the CCA\'s aim to streamline commercial litigation. It provides information about the act\'s provisions and its focus on mediation. \n**B. LLM Summarizer Findings:** The LLM summarizer identified key details about the CCA, including:\n    - The mandatory nature of mediation prior to filing a commercial case.\n    - The possibility of bypassing mediation in urgent situations, subject to judicial review. \n    - The Supreme Court\'s stance on the use of urgent interim relief as grounds for avoiding mediation, especially in cases involving deception. \n**C. Synthesis of Information from Various Sources:** Combining data from the LLM summarizer and the DFE, a comprehensive understanding emerges of the CCA\'s impact on trademark disputes. It emphasizes the central role of mediation, the potential for challenges to circumventing it, and the Supreme Court\'s interpretation of urgent cases.\n\n### IV. Review of Previously Saved Document Data\n**A. Relevant Legal Precedents:** The previously saved legal documents provide context for understanding the CCA\'s implementation and its interpretation by Indian courts. They illustrate specific cases where the Supreme Court has ruled on the use of urgency as a justification for bypassing mediation. \n**B. Applicable Procedures and Arguments:**  The review of previously saved legal documents reveals the procedural requirements for mediation under the CCA and the arguments that can be made by plaintiffs and defendants in trademark disputes.\n**C. Potential Case Outcomes:**  The previously saved documents highlight potential outcomes in trademark cases under the CCA, depending on the specific circumstances and arguments presented.\n\n### V. Conclusions and Recommendations\n**A. Primary Findings:** \n   - The CCA significantly influences trademark disputes by mandating mediation as a preferred resolution method.\n   - Plaintiffs are required to demonstrate genuine urgency to bypass mediation.\n   - Defendants retain the right to challenge attempts to circumvent mediation, ensuring a fair process for all parties involved. \n**B. Suggested Course of Action:**\n   - Carefully review the CCA and its provisions, including the mandatory mediation process.\n   -  Consider the potential for challenging attempts to circumvent mediation.\n   -  Seek legal advice to ensure compliance with the CCA and its requirements.\n**C. Potential Implications:**\n   - The CCA fosters a more efficient and equitable approach to resolving trademark disputes.\n   - It promotes alternative dispute resolution mechanisms, minimizing the need for costly and time-consuming litigation.\n   - The emphasis on mediation encourages amicable solutions and preserves business relationships.\n\n### VI. Appendices\n**A. List of Referenced Documents:**\n   - The Commercial Courts Act, 2015 \n   - The Commercial Courts Rules, 2018 \n   - Relevant Supreme Court rulings on the CCA and mediation.\n   - Other legal documents related to trademark disputes and the CCA.\n**B. Glossary of Key Terms:**\n   - Commercial Courts Act (CCA)\n   - Commercial Courts Rules\n   - Mediation\n   - Urgent Cases\n   - Interim Relief\n**C. Additional Supporting Information:**\n   - Links to relevant online resources \n   - Further research materials and analysis\n\n------------------------------------------------------------------------------\n\n*This document is a computer-generated summary based on the data collected and analyzed by Pragati.ai-Research Engine. While efforts have been made to ensure accuracy, this summary should not be considered as legal advice. Please consult with a qualified legal professional for interpretation and application of this information.*\n');
/*!40000 ALTER TABLE `doc_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `library`
--

DROP TABLE IF EXISTS `library`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `library` (
  `library_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `list_of_chat_id` text NOT NULL,
  `list_of_search_id` text,
  `list_of_doc_id` text,
  PRIMARY KEY (`library_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `library_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `library`
--

LOCK TABLES `library` WRITE;
/*!40000 ALTER TABLE `library` DISABLE KEYS */;
INSERT INTO `library` VALUES (1,18,'[76, 77, 78, 80]','[23, 24]','[22]'),(2,22,'[]','[]','[]'),(6,27,'[]','[]','[]'),(11,32,'[]','[]','[]');
/*!40000 ALTER TABLE `library` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `search_data`
--

DROP TABLE IF EXISTS `search_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `search_data` (
  `search_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `query` varchar(255) DEFAULT NULL,
  `response` text,
  PRIMARY KEY (`search_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `search_data_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `search_data`
--

LOCK TABLES `search_data` WRITE;
/*!40000 ALTER TABLE `search_data` DISABLE KEYS */;
INSERT INTO `search_data` VALUES (23,18,'Commercial Courts Act','Title: Summary of Commercial Courts Acts & Rules \n\nSections: \nMain Points:\n1. The Commercial Courts Act: This act aims to streamline commercial disputes by creating specialized courts and promoting alternative dispute resolution mechanisms like mediation. \n2. The Commercial Courts Rules, 2018: These rules provide a framework for the operation of commercial courts, including procedures for filing cases, conducting trials, and enforcing judgments.\n3.  The Importance of Mediation:  The Commercial Courts Act emphasizes the importance of mediation as a pre-litigation dispute resolution tool. This is particularly relevant in trademark cases where the plaintiff might attempt to circumvent mediation. \n\nKey Details:\n-  The Commercial Courts Act mandates mediation before a commercial case is filed. \n-  Plaintiffs can bypass mediation in urgent cases, but this loophole can be challenged in court. \n-  The Supreme Court of India ruled that urgent interim relief cannot be a reason to avoid mediation, particularly in cases of falsity or deception. \n\nSummary: The Commercial Courts Act and the accompanying rules aim to expedite commercial disputes by establishing dedicated courts and promoting mediation as a preferred resolution method.  The act highlights the importance of mediation, especially in situations where plaintiffs might attempt to avoid it, ensuring a fair process for defendants. This approach emphasizes swift dispute resolution and encourages amicable solutions within the commercial realm. \nTHE COMMERCIAL COURTS ACT, 2015 ______ ARRANGEMENT ... -> https://www.indiacode.nic.in/bitstream/123456789/2156/1/a2016-04.pdf\n Shraddha Chirania, LL.M. \'24, Makes an Impact on Commercial ... -> https://law.temple.edu/news/shraddha-chirania-ll-m-24-makes-an-impact-on-commercial-courts-act-in-india/\n Commercial Courts Act, 2015 - India Code -> https://indiacode.nic.in/handle/123456789/2156?sam_handle=123456789\n Commercial Courts Acts & Rules - National Legal Services Authority! -> https://nalsa.gov.in/the-commercial-courts-acts-rules\n Commercial Division - NY Supreme Court | NYCOURTS.GOV -> https://ww2.nycourts.gov/courts/comdiv/index.shtml\n'),(24,18,'Trade Laws in India','Title: Summary of Trade Agreements in India\n\nSections: \nMain Points:\n1. **India has a robust network of trade agreements:** The Indian government actively pursues bilateral and regional trade agreements to enhance its export markets and secure access to essential resources.\n2. **India has concluded numerous trade agreements:** The text outlines a comprehensive list of trade agreements signed by India, encompassing Free Trade Agreements (FTAs), Preferential Trade Agreements (PTAs), and other cooperative frameworks. \n3. **India is actively engaging in ongoing negotiations:** The document highlights several current trade negotiations that India is involved in, indicating the government\'s commitment to expanding its trade partnerships.\n\nKey Details: \n-  The list details FTAs and PTAs with major economic partners like the United Arab Emirates, Australia, ASEAN, and South Asian nations. \n-  It includes details on ongoing negotiations with countries like the United States, Australia, and Bangladesh.\n-  The text emphasizes the Indian government\'s commitment to the World Trade Organization (WTO) and its adherence to trade regulations. \n\nSummary: The text provides a comprehensive overview of India\'s trade agreements, both past and present. It emphasizes India\'s active engagement in regional and bilateral trade negotiations to diversify its export markets and ensure access to critical resources. The document also underscores the Indian government\'s commitment to international trade rules and regulations as reflected in its involvement with the WTO. \nIndia - Trade Agreements -> https://www.trade.gov/country-commercial-guides/india-trade-agreements\n India - Trade Barriers | Privacy Shield -> https://www.privacyshield.gov/ps/article?id=India-Trade-Barriers\n India - Standards for Trade -> https://www.trade.gov/country-commercial-guides/india-standards-trade\n 2023–2024 Bhagwati Fellows Focus on International Trade Law ... -> https://www.law.columbia.edu/news/archive/2023-2024-bhagwati-fellows-focus-international-trade-law\n Trade Agreements - Mcommerce -> https://www.commerce.gov.in/international-trade/trade-agreements/\n');
/*!40000 ALTER TABLE `search_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(80) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT '/static/images/defaultUserImage.png',
  `profession` varchar(45) DEFAULT NULL,
  `bio` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (18,'gatij','gatij.shakya.29.11@gmail.com','$2b$10$GSIwYwhs2/llWQV0jcRWbuP5awTSMLKFIBlqk5e9V7OLB4B3uY2ri','Gatij','Shakyawar','2003-11-29','Male','/static/images/defaultUserImage.png','Software Engineer','Hii this is Gatij Shakyawar'),(22,'john_doe','john.doe@example.com','$2b$10$98IC8ZwZLlWwqsjtWozjLeZ3aWKluC4xX2.7UZ0P/gSmC6kxNZwu6','John','Doe','2000-01-01','Male','/static/images/defaultUserImage.png',NULL,NULL),(27,'sam_doe','Sam.doe@example.com','$2b$10$eojwJKDf9OOOeKLBaqACYu1d0FE8/QgaPKBxx.A3aCP0KY7g8.cR6','Sam','Doe','2000-01-01','Male','/static/images/defaultUserImage.png','Developer','Hii'),(32,'sahil','sahil@gmail.com','$2b$10$JvDnGziN1BgPbYwaapTP9u4KsUk3iFhbdvk0HelK7oGUkfwyO7PeS','Sahil','Sourav','2004-01-01','Male','/static/images/defaultUserImage.png','Developer','Hello this is Sahil');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-07  5:09:29
